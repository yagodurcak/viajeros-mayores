# Supabase Setup for Public Profiles

## 📋 Required Tables

### 1. `profiles` (ya existe, verificar campos)

```sql
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para búsqueda rápida por username
CREATE INDEX idx_profiles_username ON profiles(username);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

### 2. `reviews` (nueva tabla)

```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  place_name TEXT NOT NULL,
  place_type TEXT CHECK (place_type IN ('hotel', 'restaurant', 'experience')) NOT NULL,
  place_id TEXT, -- ID externo del lugar (ej: de una API)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_place_id ON reviews(place_id);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (true);

-- Policy: Users can create their own reviews
CREATE POLICY "Users can create own reviews"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own reviews
CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own reviews
CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);
```

### 3. `badges` (nueva tabla)

```sql
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL, -- Emoji o URL de imagen
  criteria TEXT, -- Descripción de cómo ganar el badge
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read badges
CREATE POLICY "Badges are viewable by everyone"
  ON badges FOR SELECT
  USING (true);

-- Insert some initial badges
INSERT INTO badges (name, description, icon, criteria) VALUES
  ('First Review', 'Posted your first review', '⭐', 'Post your first review'),
  ('Reviewer', 'Posted 10 reviews', '🌟', 'Post 10 reviews'),
  ('Super Reviewer', 'Posted 50 reviews', '💫', 'Post 50 reviews'),
  ('Explorer', 'Reviewed 5 different places', '🗺️', 'Review 5 different places'),
  ('World Traveler', 'Reviewed 20 different places', '✈️', 'Review 20 different places'),
  ('Helpful', 'Received 10 helpful votes', '👍', 'Get 10 helpful votes on your reviews'),
  ('Trusted Voice', 'Received 50 helpful votes', '🏆', 'Get 50 helpful votes on your reviews');
```

### 4. `user_badges` (nueva tabla - relación muchos a muchos)

```sql
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, badge_id) -- Un usuario no puede ganar el mismo badge dos veces
);

-- Índices
CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_user_badges_earned_at ON user_badges(earned_at DESC);

-- Enable RLS
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read user badges
CREATE POLICY "User badges are viewable by everyone"
  ON user_badges FOR SELECT
  USING (true);
```

## 🔧 Trigger para actualizar `updated_at`

```sql
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Apply to reviews
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## 🎯 Function para otorgar badges automáticamente

```sql
-- Function to check and award badges based on review count
CREATE OR REPLACE FUNCTION check_and_award_review_badges()
RETURNS TRIGGER AS $$
DECLARE
  review_count INTEGER;
  first_review_badge_id UUID;
  reviewer_badge_id UUID;
  super_reviewer_badge_id UUID;
BEGIN
  -- Count user's reviews
  SELECT COUNT(*) INTO review_count
  FROM reviews
  WHERE user_id = NEW.user_id;

  -- Get badge IDs
  SELECT id INTO first_review_badge_id FROM badges WHERE name = 'First Review';
  SELECT id INTO reviewer_badge_id FROM badges WHERE name = 'Reviewer';
  SELECT id INTO super_reviewer_badge_id FROM badges WHERE name = 'Super Reviewer';

  -- Award "First Review" badge
  IF review_count = 1 THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, first_review_badge_id)
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  -- Award "Reviewer" badge
  IF review_count >= 10 THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, reviewer_badge_id)
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  -- Award "Super Reviewer" badge
  IF review_count >= 50 THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, super_reviewer_badge_id)
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER award_review_badges_trigger
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION check_and_award_review_badges();
```

## 📝 Notas

1. **Enable UUID extension** (si no está habilitado):

   ```sql
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```

2. **Verificar que profiles existe**: La tabla `profiles` debería crearse automáticamente cuando un usuario se registra. Si no existe, créala con el esquema de arriba.

3. **RLS (Row Level Security)**: Todas las políticas están configuradas para:
   - Lectura pública (cualquiera puede ver)
   - Escritura solo para el dueño (solo el usuario puede editar su contenido)

4. **Badges automáticos**: Los triggers otorgarán badges automáticamente cuando los usuarios cumplan los criterios.

## 🚀 Orden de creación

1. Verificar/crear tabla `profiles`
2. Crear tabla `reviews`
3. Crear tabla `badges` e insertar badges iniciales
4. Crear tabla `user_badges`
5. Crear triggers y functions

## 🧪 Datos de prueba (opcional)

```sql
-- Insert test review (reemplaza USER_ID con un UUID real)
INSERT INTO reviews (user_id, title, content, rating, place_name, place_type)
VALUES
  ('USER_ID_HERE', 'Amazing hotel!', 'The service was excellent and the rooms were very clean.', 5, 'Grand Hotel', 'hotel'),
  ('USER_ID_HERE', 'Great food', 'Delicious pasta and friendly staff.', 4, 'Italian Restaurant', 'restaurant');
```
