import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useRef } from "react";

function StudentFilters({
  filter = {},
  cityList = [],
  onChange,
  onSearchChange,
}) {
  const searchRef = useRef()

  const handleSearchChange = (e) => {
    if (!onSearchChange) return;

    const newFilter = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };

    onSearchChange(newFilter);
  };

  const handleCityChange = (e) => {
    if (!onChange) return;

    const newFilter = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    };
    onChange(newFilter);
  };

  const handleSortChange = (e) => {
    if (!onChange) return;
    
    const value = e.target.value
    const [_sort, _order] = value.split('.')
    const newFilter = {
      ...filter,
      _sort: _sort || undefined,
      _order: _order || undefined // 'asc', 'desc'
    };
    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter = {
      ...filter,
      _page: 1,
      city: undefined,
      name_like: undefined,
      _sort: undefined,
      _order: undefined // 'asc', 'desc'
    };
    onChange(newFilter);

    if (searchRef.current) {
      searchRef.current.value = ''
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search by name"
              endAdornment={<Search />}
              defaultValue={filter.name_like}
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>

        <Grid item sx={12} md={6} lg={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              value={filter.city || ""}
              onChange={handleCityChange}
              label="Filter by city"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>

              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item sx={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sortBy">Sort by</InputLabel>
            <Select
              labelId="sortBy"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
              label="Filter by city"
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>
              <MenuItem value='name.asc'>Name ASC</MenuItem>
              <MenuItem value='name.desc'>Name DESC</MenuItem>
              <MenuItem value='mark.asc'>Mark ASC</MenuItem>
              <MenuItem value='mark.desc'>Mark DE  SC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item sx={12} md={6} lg={1}>
        <Button variant='outlined' color='primary' fullWidth onClick={handleClearFilter} >Clear</Button>
        </Grid>

      </Grid>
    </Box>
  );
}

export default StudentFilters;
