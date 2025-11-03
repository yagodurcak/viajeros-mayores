declare module 'react-date-range' {
  export interface Range {
    startDate?: Date;
    endDate?: Date;
    key: string;
  }

  export interface DateRangePickerProps {
    ranges: Range[];
    onChange: (ranges: any) => void;
    rangeColors?: string[];
    months?: number;
    direction?: 'horizontal' | 'vertical';
    showSelectionPreview?: boolean;
    moveRangeOnFirstSelection?: boolean;
    className?: string;
    [key: string]: any;
  }

  export const DateRangePicker: React.FC<DateRangePickerProps>;
}

declare module 'react-date-range/dist/styles.css';
declare module 'react-date-range/dist/theme/default.css';
