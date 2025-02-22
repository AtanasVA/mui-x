import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [{ field: 'brand', width: 100 }];

const NoRowsOverlay = () => {
  const [text, setText] = React.useState('Refresh');

  return (
    <button type="button" data-testid="refresh" onClick={() => setText('Clicked')}>
      {text}
    </button>
  );
};

export default function NoRowsOverlayWithButton() {
  return (
    <React.Fragment>
      <div style={{ width: 300, height: 300 }}>
        <DataGrid columns={columns} rows={[]} components={{ NoRowsOverlay }} />
      </div>
    </React.Fragment>
  );
}
