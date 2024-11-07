import React from 'react';
import MUI from '../MUI';
import { Paper, Slider } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { SliderPropsSizeOverrides } from '@mui/material/Slider/Slider';
import { MUITheme } from '../types';

type Props = {
  theme: MUITheme;
  onChange: (event: any) => void;
  value: number;
  step: number;
  min: number;
  max: number;
  enabled: boolean;
  marks: boolean;
  valueLabelDisplay: boolean;
  size?: OverridableStringUnion<'small' | 'medium', SliderPropsSizeOverrides>;
};

let timeout: number | null = null;

export default (props: Props) => {
  const { onChange, step, min, max, enabled, marks, valueLabelDisplay, size } =
    props;
  const [value, setValue] = React.useState(props.value);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => {
      onChange(e.target.value);
    }, 100);
  };

  return (
    <MUI theme={props.theme}>
      <Paper style={{ height: 'inherit', width: 'inherit' }}>
        <Slider
          disabled={!enabled}
          marks={marks}
          valueLabelDisplay={valueLabelDisplay ? 'auto' : 'off'}
          value={value}
          step={step}
          min={min}
          max={max}
          size={size}
          onChange={handleChange}
        />
      </Paper>
    </MUI>
  );
};
