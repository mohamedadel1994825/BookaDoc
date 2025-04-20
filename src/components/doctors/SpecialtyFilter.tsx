"use client";

import { specialties } from "@/helpers/mockData";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

interface SpecialtyFilterProps {
  onFilterChange: (specialty: string | null) => void;
  selectedSpecialty: string | null;
}

export default function SpecialtyFilter({
  onFilterChange,
  selectedSpecialty,
}: SpecialtyFilterProps) {
  const handleSpecialtyChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    onFilterChange(value === "all" ? null : value);
  };

  const handleChipClick = (specialty: string | null) => {
    onFilterChange(specialty);
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* Mobile view: Select dropdown */}
      <Box sx={{ display: { xs: "block", md: "none" }, mb: 2 }}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel id="specialty-select-label">Specialty</InputLabel>
          <Select
            labelId="specialty-select-label"
            id="specialty-select"
            value={selectedSpecialty || "all"}
            onChange={handleSpecialtyChange}
            label="Specialty"
          >
            <MenuItem value="all">All Specialties</MenuItem>
            {specialties.map((specialty) => (
              <MenuItem key={specialty} value={specialty}>
                {specialty}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Desktop view: Chip filters */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: { xs: "none", md: "flex" },
          flexWrap: "wrap",
          "& .MuiChip-root": { mb: 1 },
        }}
      >
        <Chip
          label="All"
          color={selectedSpecialty === null ? "primary" : "default"}
          onClick={() => handleChipClick(null)}
          variant={selectedSpecialty === null ? "filled" : "outlined"}
        />
        {specialties.map((specialty) => (
          <Chip
            key={specialty}
            label={specialty}
            color={selectedSpecialty === specialty ? "primary" : "default"}
            onClick={() => handleChipClick(specialty)}
            variant={selectedSpecialty === specialty ? "filled" : "outlined"}
          />
        ))}
      </Stack>
    </Box>
  );
}
