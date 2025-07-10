import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const FormWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '700px',
  margin: '0 auto',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  textAlign: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function ListPropertyForm() {
  const [transactionType, setTransactionType] = useState('');
  const [formData, setFormData] = useState({
    pID: '',
    bhk: '',
    type: '',
    area: '',
    facing: '',
    floor: '',
    price: '',
    place: '',
    status: '',
    age: '',
    img: '',
  });

  useEffect(() => {
    if (transactionType) {
      const fetchLength = async () => {
        const endpoint = transactionType === 'buy' ? 'http://localhost:5000/buy' : 'http://localhost:5000/rent';
        try {
          const response = await fetch(endpoint);
          const data = await response.json();
          const newID = data.length + 1;
          setFormData((prevData) => ({
            ...prevData,
            pID: newID,
          }));
        } catch (error) {
          console.error('Error fetching property data:', error);
        }
      };
      fetchLength();
    }
  }, [transactionType]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = transactionType === 'buy' ? 'http://localhost:5000/buy' : 'http://localhost:5000/rent';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert(`Property listed successfully for ${transactionType}`);
        setFormData({
          pID: '',
          bhk: '',
          type: '',
          area: '',
          facing: '',
          floor: '',
          price: '',
          place: '',
          status: '',
          age: '',
          img: '',
        });
        setTransactionType('');
      } else {
        const errorText = await response.text(); // Get the error response
        alert(`Failed to list property: ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while listing the property.');
    }
  };

  return (
    <Box mt={6} mb={6}>
      <FormWrapper elevation={3}>
        <FormTitle sx={{ color: 'black', fontWeight: '400' }} variant="h4">
          Sell or Rent Your Property Faster with Estately
        </FormTitle>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Transaction Type</InputLabel>
                <Select
                  name="transactionType"
                  value={transactionType}
                  onChange={handleTransactionTypeChange}
                >
                  <MenuItem value="buy">Sell</MenuItem>
                  <MenuItem value="rent">Rent</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Property ID"
                name="pID"
                value={formData.pID}
                onChange={handleChange}
                disabled // Disable the input so users can't manually edit the ID
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="BHK"
                name="bhk"
                value={formData.bhk}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Property Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="villa">Villa</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Area (sq ft)"
                name="area"
                value={formData.area}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Facing"
                name="facing"
                value={formData.facing}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Floor"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Place"
                name="place"
                value={formData.place}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Age of Property"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </Grid>

            {/* Image URL */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                name="img"
                value={formData.img}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <StyledButton fullWidth variant="contained" type="submit">
                Submit
              </StyledButton>
            </Grid>
          </Grid>
        </form>
      </FormWrapper>
    </Box>
  );
}

export default ListPropertyForm;
