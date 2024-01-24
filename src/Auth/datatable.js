import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import _ from 'lodash';
import { Provider as PaperProvider } from 'react-native-paper-dates'; // Import the PaperProvider

const MyComponent = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const [items, setItems] = useState([
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedItems = _.orderBy(items, sortedColumn, sortDirection);

  return (
    <DataTable style={{ flex: 1 }}>
      <DataTable.Header>
        <DataTable.Title onPress={() => handleSort('name')}>Dessert</DataTable.Title>
        <DataTable.Title numeric onPress={() => handleSort('calories')}>Calories</DataTable.Title>
        <DataTable.Title numeric onPress={() => handleSort('fat')}>Fat</DataTable.Title>
      </DataTable.Header>

      {sortedItems.slice(from, to).map((item) => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
          <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(sortedItems.length / itemsPerPage)}
        onPageChange={(newPage) => setPage(newPage)}
        label={`${from + 1}-${to} of ${sortedItems.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) => setItemsPerPage(value)}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

// Wrap your root component with PaperProvider
const App = () => {
  return (
    <PaperProvider>
      <MyComponent />
    </PaperProvider>
  );
};

export default MyComponent;
