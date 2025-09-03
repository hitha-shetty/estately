import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function FilterContents() {
  return (
    <div>
      <div>
        <span>Covered area(sqft.)</span>
        <div className="sqft-flex">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={min}
              label="Min"
              onChange={handleChange}
            >
               <MenuItem value={100}>100</MenuItem>
              <MenuItem value={200}>200</MenuItem>
              <MenuItem value={300}>300</MenuItem>
              <MenuItem value={400}>400</MenuItem>
              <MenuItem value={500}>500</MenuItem>
              <MenuItem value={600}>600</MenuItem>
              <MenuItem value={100}>700</MenuItem>
              <MenuItem value={200}>800</MenuItem>
              <MenuItem value={300}>900</MenuItem>
              <MenuItem value={400}>1000</MenuItem>
              <MenuItem value={500}>1200</MenuItem>
              <MenuItem value={600}>1500</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={min}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={200}>200</MenuItem>
              <MenuItem value={300}>300</MenuItem>
              <MenuItem value={400}>400</MenuItem>
              <MenuItem value={500}>500</MenuItem>
              <MenuItem value={600}>600</MenuItem>
              <MenuItem value={100}>700</MenuItem>
              <MenuItem value={200}>800</MenuItem>
              <MenuItem value={300}>900</MenuItem>
              <MenuItem value={400}>1000</MenuItem>
              <MenuItem value={500}>1200</MenuItem>
              <MenuItem value={600}>1500</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default FilterContents;
