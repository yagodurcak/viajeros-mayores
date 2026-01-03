import type { Metadata } from 'next';
import { generateSEOMetadata } from '@/lib/seo-config';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Términos y Condiciones - Viajeros Mayores',
  description:
    'Términos y condiciones de uso de Viajeros Mayores. Conoce nuestras políticas y condiciones para el uso de nuestra plataforma de turismo accesible.',
  url: '/terms',
  type: 'website',
});

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-gray-600 mb-8">
            Última actualización: {new Date().toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Aceptación de los Términos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Al acceder y utilizar el sitio web de Viajeros Mayores
                (en adelante, "el Sitio"), usted acepta cumplir con estos
                Términos y Condiciones y todas las leyes y regulaciones
                aplicables. Si no está de acuerdo con alguno de estos términos,
                no debe utilizar el Sitio.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Descripción del Servicio
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Viajeros Mayores es una plataforma digital diseñada para
                proporcionar información, recursos y herramientas relacionadas
                con el turismo accesible para personas mayores y personas con
                movilidad reducida. El Sitio ofrece:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>Información sobre destinos turísticos accesibles</li>
                <li>
                  Herramientas de análisis de accesibilidad (analizador de
                  pendientes)
                </li>
                <li>Artículos y noticias sobre turismo accesible</li>
                <li>
                  Una comunidad donde los usuarios pueden compartir
                  experiencias y consejos
                </li>
                <li>
                  Información generada mediante inteligencia artificial sobre
                  destinos
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Uso del Sitio
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Usted se compromete a utilizar el Sitio de manera responsable y
                de acuerdo con estos términos. Específicamente, usted acepta:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>
                  No utilizar el Sitio para ningún propósito ilegal o no
                  autorizado
                </li>
                <li>
                  No intentar acceder a áreas restringidas del Sitio o a
                  sistemas relacionados
                </li>
                <li>
                  No transmitir virus, malware o cualquier código dañino
                </li>
                <li>
                  No recopilar información de otros usuarios sin su
                  consentimiento
                </li>
                <li>
                  No publicar contenido ofensivo, difamatorio, discriminatorio o
                  que viole derechos de terceros
                </li>
                <li>
                  Proporcionar información precisa y actualizada en su perfil
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Cuentas de Usuario
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Para acceder a ciertas funcionalidades del Sitio, puede ser
                necesario crear una cuenta. Usted es responsable de:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>
                  Mantener la confidencialidad de su contraseña y credenciales
                  de acceso
                </li>
                <li>
                  Todas las actividades que ocurran bajo su cuenta
                </li>
                <li>
                  Notificar inmediatamente cualquier uso no autorizado de su
                  cuenta
                </li>
                <li>
                  Proporcionar información veraz, precisa y completa al crear su
                  cuenta
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Contenido Generado por Usuarios
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Los usuarios pueden publicar contenido, incluyendo comentarios,
                artículos, reseñas y otros materiales. Al publicar contenido,
                usted:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>
                  Otorga a Viajeros Mayores una licencia no exclusiva,
                  mundial, libre de regalías para usar, reproducir, modificar y
                  distribuir su contenido en el Sitio
                </li>
                <li>
                  Garantiza que tiene todos los derechos necesarios sobre el
                  contenido que publica
                </li>
                <li>
                  Se compromete a que su contenido no infringe derechos de
                  terceros
                </li>
                <li>
                  Reconoce que Viajeros Mayores se reserva el derecho de
                  moderar, editar o eliminar cualquier contenido que considere
                  inapropiado
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Información e Inteligencia Artificial
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                El Sitio utiliza inteligencia artificial para generar
                información sobre destinos turísticos. Usted reconoce y acepta
                que:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>
                  La información generada por IA es solo para fines informativos
                  y no constituye asesoramiento profesional
                </li>
                <li>
                  La información puede contener imprecisiones o estar
                  desactualizada
                </li>
                <li>
                  Debe verificar la información importante antes de tomar
                  decisiones de viaje
                </li>
                <li>
                  Viajeros Mayores no garantiza la exactitud, completitud o
                  actualidad de la información proporcionada
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Propiedad Intelectual
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Todo el contenido del Sitio, incluyendo pero no limitado a
                textos, gráficos, logotipos, iconos, imágenes, clips de audio,
                descargas digitales y compilaciones de datos, es propiedad de
                Viajeros Mayores o de sus proveedores de contenido y está
                protegido por las leyes de propiedad intelectual.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Usted no puede reproducir, distribuir, modificar, crear obras
                derivadas, mostrar públicamente, realizar públicamente,
                republicar, descargar, almacenar o transmitir ningún contenido
                del Sitio sin el consentimiento previo por escrito de Viajeros
                Mayores.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Enlaces a Terceros
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                El Sitio puede contener enlaces a sitios web de terceros. Estos
                enlaces se proporcionan únicamente para su conveniencia.
                Viajeros Mayores no tiene control sobre el contenido de estos
                sitios y no asume responsabilidad por ellos. La inclusión de
                cualquier enlace no implica respaldo por parte de Viajeros
                Mayores.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Limitación de Responsabilidad
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                En la máxima medida permitida por la ley, Viajeros Mayores no
                será responsable de:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
                <li>
                  Cualquier daño directo, indirecto, incidental, especial,
                  consecuente o punitivo resultante del uso o la imposibilidad
                  de usar el Sitio
                </li>
                <li>
                  Pérdidas o daños resultantes de información inexacta o
                  incompleta proporcionada en el Sitio
                </li>
                <li>
                  Decisiones de viaje tomadas basándose en la información del
                  Sitio
                </li>
                <li>
                  Interrupciones del servicio, errores técnicos o fallos del
                  sistema
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Privacidad
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Su uso del Sitio también está regido por nuestra Política de
                Privacidad. Al utilizar el Sitio, usted consiente la recopilación
                y el uso de su información de acuerdo con nuestra Política de
                Privacidad.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Modificaciones de los Términos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Viajeros Mayores se reserva el derecho de modificar estos
                Términos y Condiciones en cualquier momento. Las modificaciones
                entrarán en vigor inmediatamente después de su publicación en el
                Sitio. Su uso continuado del Sitio después de cualquier
                modificación constituye su aceptación de los nuevos términos.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Terminación
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Viajeros Mayores se reserva el derecho de terminar o suspender
                su acceso al Sitio, con o sin causa o aviso previo, por cualquier
                motivo, incluyendo pero no limitado a la violación de estos
                Términos y Condiciones.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                13. Ley Aplicable
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Estos Términos y Condiciones se regirán e interpretarán de
                acuerdo con las leyes del país donde Viajeros Mayores opera,
                sin tener en cuenta sus disposiciones sobre conflictos de
                leyes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                14. Contacto
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Si tiene preguntas sobre estos Términos y Condiciones, puede
                contactarnos a través de los medios proporcionados en el Sitio.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Al utilizar este sitio web, usted reconoce que ha leído,
                entendido y acepta estar sujeto a estos Términos y Condiciones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;


