"use client";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function SearchBar({ onSearch }: { onSearch: (search: string) => void }) {
  const [search, setSearch] = useState("");
  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <Paper
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Pesquisar Sistemas"
        inputProps={{ 'aria-label': 'Pesquisar Sistemas' }}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => onSearch(search)}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}