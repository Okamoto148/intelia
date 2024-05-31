import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import AddRoadIcon from '@mui/icons-material/AddRoad';

export default function InputWithIcon({onChangeInput, onChangeInput2, value, value2, activeStep, icon1, icon2, icon3, icon4, icon5, label,label2}) {
    function handleInput(event){
        onChangeInput(event.currentTarget.value)
    }
    function handleInput2(event){
        onChangeInput2(event.currentTarget.value)
    }

  return (
    <Box sx={{ '& > :not(style)': { m: 1 }}} style={{width: '100%'}}>
      <FormControl variant="standard" style={{width: '100%'}}>
        <InputLabel htmlFor="input-with-icon-adornment" >
          {label}
        </InputLabel>
        {icon1&&<Input
          onChange={handleInput}
          value={value}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              {(activeStep+1==1)&&<AccountCircle />}
              {(activeStep+1==2)&&<HomeIcon />}
            </InputAdornment>
          }
        />}
		
        <InputLabel htmlFor="input-with-icon2-adornment" >
          {label2}
        </InputLabel>
        {icon2&&<Input
          onChange={handleInput2}
          value={value2}
          id="input-with-icon2-adornment"
          startAdornment={
            <InputAdornment position="start">
              {(activeStep+1==1)&&<CalendarTodayIcon />}
			  {(activeStep+1==2)&&<HomeIcon />}
            </InputAdornment>
          }
        />}
		
		 <InputLabel htmlFor="input-with-icon-adornment" >
          {label}
        </InputLabel>
        {icon3&&<Input
          onChange={handleInput}
          value={value}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              {(activeStep+1==1)&&<AccountCircle />}
              {(activeStep+1==2)&&<AddRoadIcon />}
            </InputAdornment>
          }
        />}
		
		 <InputLabel htmlFor="input-with-icon-adornment" >
          {label}
        </InputLabel>
        {icon4&&<Input
          onChange={handleInput}
          value={value}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              {(activeStep+1==1)&&<AccountCircle />}
              {(activeStep+1==2)&&<HomeIcon />}
            </InputAdornment>
          }
        />}
		
		 <InputLabel htmlFor="input-with-icon-adornment" >
          {label}
        </InputLabel>
        {icon5&&<Input
          onChange={handleInput}
          value={value}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              {(activeStep+1==1)&&<AccountCircle />}
              {(activeStep+1==2)&&<HomeIcon />}
            </InputAdornment>
          }
        />}
      </FormControl>
      
      
    </Box>
  );
}