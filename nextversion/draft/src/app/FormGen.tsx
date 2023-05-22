import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Container, Button } from '@mui/material';

function FormGen({ onGeneratePrompt }) {
  const [name, setName] = useState('');
  const [years, setYears] = useState('');
  const [qual, setQual] = useState('');

  function getValue(event) {
    setName(event.target.value);
  }

  function getYears(event) {
    setYears(event.target.value);
  }

  function getQual(event) {
    setQual(event.target.value);
  }

  function handleGenerate() {
    const updatedPrompt = `write me 7 wedding vows from the perspective of an intelligent, well-written, and loving husband.
      Use some of the characteristics below in the vows.
      Use the example vows as examples, but do not copy them word for word.
      try to avoid being cheesy.
      Spouse name: ${name}.
      Qualities of Wife: ${qual}.
      Years known each other: ${years}.
      Example Vows: I vow to always be your protector, and confidante, responsible for making sure your every need is met,
      every want is reached, and every dream realized.
      I feel overwhelmingly lucky and proud to be standing beside you today.
      Thank you for accepting me for all that I am.
      I love you with my whole heart with a passion that cannot be expressed in words, only in kisses, glances, and years of adventure by your side.
      I vow to always protect you from harm, to stand with you against your troubles, and to look to you when I need protection.`;

    onGeneratePrompt(updatedPrompt);
  }

  return (
    <Container>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Spouse Name"
            placeholder="Janet"
            multiline
            maxRows={4}
            onChange={getValue}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Years Together"
            placeholder="3"
            multiline
            maxRows={4}
            onChange={getYears}
          />
        </div>
        <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Qualities of Spouse"
            placeholder=""
            multiline
            maxRows={4}
            onChange={getQual}
          />
        </div>
        <div className="mt-3">
          <Button variant="outlined" onClick={handleGenerate}>
            Generate
          </Button>
        </div>
      </Box>
    </Container>
  );
}

export default FormGen;
