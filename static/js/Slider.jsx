// ==== Slider Component ==== https://material-ui.com/api/slider/
function RangeSlider(props) {
  
    const {
      makeStyles,
      Slider,
    } = MaterialUI;
  
    const useStyles = makeStyles({
      root: {
        width: 300,
        color: '#52af77',
      },
    });
  
    const marks = [
      {
        value: 0,
        label: '0°C',
      },
      {
        value: 20,
        label: '20°C',
      },
      {
        value: -20,
        label: '-20°C',
      },
      {
        value: -40,
        label: '-40°C',
      },
      {
        value: 40,
        label: '-40°C',
      },
    ];
  
    const classes = useStyles();
    const [value, setValue] = React.useState([15, 27]);
    
    function valuetext(value) {
      return `${value}`;
    }
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleTavgChange = (event, newValue) => {
      props.setTavgLow(newValue[0])
      props.setTavgHigh(newValue[1])
    }
  
    return (
      <div id="slider" className={classes.root}>
        <br/>
        <br/>
        <Slider
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleTavgChange}
          aria-labelledby="range-slider"
          min={-45}
          max={45}
          marks={marks}
          getAriaValueText={valuetext}
          valueLabelDisplay="on"
        />
      </div>
    );
  }
  // ==== End of Slider component ====