/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import react, {useState} from 'react';
import { Button } from 'react-native-paper';
import React, {useEffect, useCallback} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import orientation from 'react-native-orientation';
import Loader from '../Components/Loader';
import { DataTable, Text } from 'react-native-paper';
// import  from 'react';
import {
  StyleSheet,
  onPress,
  // Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';

import {Image} from 'react-native';

import back from '../../assets/images/back2.png';
import syncStorage from 'react-native-sync-storage';

const pwd = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [orientation, setOrientation] = useState('LANDSCAPE');
  const [selectedApiData, setSelectedApiData] = useState([]);
  const [showSecondTable, setShowSecondTable] = useState(false);
  const [secondTableData, setSecondTableData] = useState([]);
  const [loadingSecondTable, setLoadingSecondTable] = useState(false);
  const [thirdTableData, setThirdTableData] = useState([]);
  const [showthirdTable, setShowThirdTable] = useState([]);
  const [showFourthTable, setShowFourthTable] = useState(false);
  const [fourthTableData, setFourthTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [counts, setCounts] = useState({
    regformCount: 0,
    countVerify: 0,
    countCommittee: 0,
    countPayment: 0,
    // districtName: '',
  });
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Set the number of items per page
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const chairmancount = () => {
    try {
      const id = syncStorage.get('bmuser_id');
  
      // Check if id is defined before proceeding
      if (!id) {
        console.error('Error: User ID is undefined.');
        return;
      }
  
      const apiUrl = `https://bm.punjab.gov.pk/api/ccView/${id}`;
  
      // console.log('Step 1: API URL', apiUrl);
  
      fetch(apiUrl)
        .then(response => {
          // console.log('Step 2: Response Status', response.status);
  
          // Check if the response status is OK (200)
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          return response.json();
        })
        .then(data => {
          // console.log('Step 3: API Response Data', data);
  
          // Use the data as needed
          setCounts({
            regformCount: data.regformCount,
            countVerify: data.countVerify,
            countCommittee: data.countCommittee,
            countPayment: data.countPayment,
            districtName: data.districtName,
          });
  
          // console.log('Step 4: State Updated', counts);
        })
        .catch(error => {
          // Handle errors
          console.error('Error:', error.message);
        });
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error.message);
    }
  };

  const orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      setOrientation('LANDSCAPE')
    } else {
      // do something with portrait layout
    }
  }
  const handleDetailsPress = (item) => {
    navigation.navigate('UserDetails', item);
  };
  const handleLogout = async (navigation) => {
    try {
      await EncryptedStorage.removeItem("user_session");
      await AsyncStorage.removeItem('authToken');
      // syncStorage.set('profileImage','');

      console.log('User successfully logged out');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (e) {
      // console.log('Error clearing auth token:', e);
  
    }
  
  };
  // sorting function
  const handleSort = (field) => {
    setSortDirection((prev) => (sortField === field ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'));
    setSortField(field);
  };
  // const fetchData = async () => {
  //   try {
  //     const id = syncStorage.get('bmuser_id');
  //     const response = await fetch(`https://bm.punjab.gov.pk/api/cmentryshow/${id}`);
  //     const result = await response.json();

  //     if (response.ok) {
  //       setData(result.data);
  //     } else {
  //       console.error('Failed to fetch data:', result.message);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // const fetchData1 = async () => {
  //   try {
  //     const id = syncStorage.get('bmuser_id');
  //     const response = await fetch(`https://bm.punjab.gov.pk/api/cmverifiedshow/${id}`);
  //     const result = await response.json();

  //     if (response.ok) {
  //       setData1(result.data);
  //     } else {
  //       console.error('Failed to fetch data:', result.message);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // const fetchData2 = async () => {
  //   try {
  //     const id = syncStorage.get('bmuser_id');
  //     const response = await fetch(`https://bm.punjab.gov.pk/api/cmcommitteeshow/${id}`);
  //     const result = await response.json();

  //     if (response.ok) {
  //       setData2(result.data);
  //     } else {
  //       console.error('Failed to fetch data:', result.message);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // const fetchData3 = async () => {
  //   try {
  //     const id = syncStorage.get('bmuser_id');
  //     const response = await fetch(`https://bm.punjab.gov.pk/api/cmpaymentshow/${id}`);
  //     const result = await response.json();

  //     if (response.ok) {
    //       setData3(result.data);
    //     } else {
      //       console.error('Failed to fetch data:', result.message);
      //     }
      //   } catch (error) {
        //     console.error('Error fetching data:', error);
        //   }
        // };
        
  const handleCirclePress = async (apiIndex) => {
          setShowTable(true);
          setShowSecondTable(false);
          setShowThirdTable(false); // Close the third table
          fetchCircleData(apiIndex);
          setCounts((prevCounts) => ({
            regformCount: apiIndex === 1 ? (data ? data.length : 0) : prevCounts.regformCount,
            countVerify: apiIndex === 2 ? (data1 ? data1.length : 0) : prevCounts.countVerify,
            countCommittee: apiIndex === 3 ? (data2 ? data2.length : 0) : prevCounts.countCommittee,
            countPayment: apiIndex === 4 ? (data3 ? data3.length : 0) : prevCounts.countPayment,
          }));
  };
  const fetchCircleData = async () => {
    try {
      const id = syncStorage.get('bmuser_id');
      const apiUrl = `https://bm.punjab.gov.pk/api/cmentryshow/${id}?page=${page + 1}`;
      
      const response = await fetch(apiUrl);
      const result = await response.json();
    
      if (response.ok) {
        setData(result.data);
        if (result.data && result.data.length > 0) {
          setSelectedApiData(result.data);
        }
      } else {
        console.error(`Failed to fetch data for Circle 1:`, result.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };   
  //api call for 2nd table
  const fetchSecondCircleData = async () => {
    try {
      setLoadingSecondTable(true);
      const id = syncStorage.get('bmuser_id');
      const response = await fetch(`https://bm.punjab.gov.pk/api/cmverifiedshow/${id}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      setSecondTableData(result.data);
    } catch (error) {
      console.error('Error fetching data for the second circle:', error.message);
    }
  };  
  const handleSecondCirclePress = async () => {
    setShowTable(false);
    setShowSecondTable(true);
    setShowThirdTable(false); // Close the third table
    fetchSecondCircleData();
  };
  //api call for 3rd table
  const fetchThirdCircleData = async () =>{
    try {
      const id = syncStorage.get('bmuser_id');
      const response = await fetch(`https://bm.punjab.gov.pk/api/cmcommitteeshow/${id}`);
      const result = await response.json();

      if (response.ok) {
        setThirdTableData(result.data);
      } else {
        console.error('Failed to fetch data for the second circle:', result.message);
      }
    } catch (error) {
      console.error('Error fetching data for the second circle:', error);
    }
  };
  const handleThirdCirclePress = async () => {
    setShowTable(false);
    setShowSecondTable(false);
    setShowThirdTable(true); // Open the third table
    fetchThirdCircleData();
  };
  //api call for fourth table work in progress
  // const fetchFourthCircleData = async () => {
  //   try {
  //     const id = syncStorage.get('bmuser_id');
  //     const response = await fetch(`https://bm.punjab.gov.pk/api/fourthCircleData/${id}`);
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  
  //     const result = await response.json();
  //     setFourthTableData(result.data);
  //   } catch (error) {
  //     console.error('Error fetching data for the fourth circle:', error.message);
  //   }
  // };
  

  // const handleFourthCirclePress = async () => {
  //   setShowTable(false);
  //   setShowSecondTable(false);
  //   setShowThirdTable(false);
  //   setShowFourthTable(true);
  //   fetchFourthCircleData();
  // };
  useEffect(() => {
    chairmancount();
    fetchCircleData(1);
  }, [page, showTable]);
   
  const sortedData = Array.isArray(selectedApiData) // Use selectedApiData for sorting and rendering
    ? selectedApiData.slice().sort((a, b) => {
        if (sortField && sortDirection) {
          const aValue = a[sortField] || '';
          const bValue = b[sortField] || '';

          if (sortDirection === 'asc') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        }
        return 0;
      })
    : [];


  return (
<View style={{ flex: 1 }}>

<View>
  <ImageBackground source={back}
        style={{ width: '100%',
        height: '100%',
        resizeMode: 'stretch', 
        backgroundAttachment: 'fixed'
        }}
         >
        <Loader loading={loading} />
  <ScrollView>
    <View style={styles.headerContainer}>
          <Text
            style={[
              styles.buttonText,
              {
                fontWeight: 'bold',
                fontSize: 28,
                paddingTop: 30,
                color: '#fff',
                textAlign: 'center',
              },
            ]}>
            Chairman
          </Text>
          <TouchableOpacity
            onPress={() => handleLogout(navigation)}
            style={styles.ButtonStyle}
            activeOpacity={0.5}>
            <Text style={[styles.text, { textAlign: 'center' }]}>Logout</Text>
          </TouchableOpacity>
           {/* <TouchableOpacity
            onPress={() => navigation.navigate('datatable')}
            style={styles.ButtonStyle}
            activeOpacity={0.5}>
            <Text style={[styles.text, { textAlign: 'center' }]}>datatable</Text>
          </TouchableOpacity> */}
    </View>
    <View style={styles.container}>
      <View style={styles.circleRow}>
      <TouchableOpacity onPress={() => handleCirclePress(1)}>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.circleText} numberOfLines={2}>
            {counts.regformCount}
          </Text>
        </View>
        <Text style={styles.labelText} numberOfLines={2}>
        جمع کرائی {'\n'}گئی درخواستیں
        </Text>
      </View>
    </TouchableOpacity>


        <View style={styles.line} />

        <TouchableOpacity onPress={() => handleSecondCirclePress()}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Text style={styles.circleText} numberOfLines={2}>
                {counts.countVerify}
              </Text>
            </View>
            <Text style={styles.labelText} numberOfLines={2}>
              تصدیق شدہ{'\n'} درخواستیں
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.line} />

        <TouchableOpacity onPress={() => handleThirdCirclePress()}>
          <View style={styles.circleContainer}>
            <View style={styles.circle}>
              <Text style={styles.circleText} numberOfLines={2}>
                {counts.countCommittee}
              </Text>
            </View>
            <Text style={styles.labelText} numberOfLines={2}>
            کمیٹی کا انتخاب
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.line} />

        <TouchableOpacity>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Text style={styles.circleText} numberOfLines={2}>
            0
            </Text>
          </View>
          <Text style={styles.labelText} numberOfLines={2}>
          ادائیگی
          </Text>
        </View>
       </TouchableOpacity>
      </View>
      {/* first datatable for submitted applications */}
      {showTable && (
        <View style={styles.tableContainer}>
          <DataTable style={[styles.dataTable, { backgroundColor: '#afbe94' }]}>
            {/* Table Headers */}
            <DataTable.Header>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('name')}
              >
                Name
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('cnic')}
              >
                CNIC
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('tehsil')}
              >
                Tehsil
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('category')}
              >
                Category
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('assign_to')}
              >
                Member
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('ddverify')}
              >
                Status
              </DataTable.Title>
            </DataTable.Header>
            {/* for data sorting in ist table */}
            {sortedData
                  .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                  .map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => { handleDetailsPress(item)
                        // Handle the touch event for the name row
                        console.log(`Name row touched: ${item.name},${item.cnic},${item.tehsil},${item.category},${item.assign_to},${item.ddverify}`);
                      }}
                    >
                      <DataTable.Row>
                        <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                          {item.name}
                        </DataTable.Cell>
                        <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                          {item.cnic}
                        </DataTable.Cell>
                        <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                          {item.tehsil}
                        </DataTable.Cell>
                        <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                          {item.category}
                        </DataTable.Cell>
                        <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                          {item.assign_to}
                        </DataTable.Cell>
                        <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                          {item.ddverify || 'Non-verified'}
                        </DataTable.Cell>
                      </DataTable.Row>
                    </TouchableOpacity>
                ))}
              {/* pagination for first table */}
                {page < Math.ceil(sortedData.length / itemsPerPage) && (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 10 , marginRight:10 }}>
                    <Text style={{ color: 'grey', fontSize: 12, textAlign: 'center', marginRight: 10 }}>
                      Page {page + 1} of {Math.ceil(sortedData.length / itemsPerPage)}
                    </Text>

                    <Button
                      mode="outlined"
                      onPress={() => setPage(Math.max(page - 1, 0))}
                      style={{ marginVertical: 10, marginLeft: 5, height: 40, justifyContent: 'center' }}
                      disabled={page === 0}
                    >
                      Back
                    </Button>

                    <Button
                      mode="outlined"
                      onPress={() => setPage(page + 1)}
                      style={{ marginVertical: 10, marginLeft: 5, height: 40, justifyContent: 'center' }}
                      disabled={page === Math.ceil(sortedData.length / itemsPerPage) - 1}
                    >
                      Next
                    </Button>
                  </View>
                )}
          </DataTable>

        </View>
      )}
      {/* second datatable for verified application  */}
      {showSecondTable && (
          <View style={styles.tableContainer}>
            <DataTable style={[styles.dataTable, { backgroundColor: '#afbe94' }]}>
              <DataTable.Header>
                <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('name')}
              >
                Name
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('cnic')}
              >
                CNIC
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('tehsil')}
              >
                Tehsil
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('category')}
              >
                Category
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('assign_to')}
              >
                Member
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('ddverify')}
              >
                Status
              </DataTable.Title>
                {/* Add more headers as needed */}
              </DataTable.Header>
              
              {secondTableData.map((item, index) => (
                <TouchableOpacity
                key={index}
                onPress={() => { handleDetailsPress(item)
                  // Handle the touch event for the name row
                  console.log(`row touched: ${item.name},${item.cnic},${item.tehsil},${item.category},${item.assign_to},${item.ddverify}`);
                }}
              >
               <DataTable.Row key={index}>
               <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                 {item.name}
               </DataTable.Cell>
               <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                 {item.cnic}
               </DataTable.Cell>
               <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                 {item.tehsil}
               </DataTable.Cell>
               <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                 {item.category}
               </DataTable.Cell>
               <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                 {item.assign_to}
               </DataTable.Cell>
               <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                 {item.ddverify}
               </DataTable.Cell>
             </DataTable.Row>
             </TouchableOpacity>
              ))}
            </DataTable>
          </View>
      )}
      {/* third datatble for committe verification */}
      {showthirdTable && (
          <View style={styles.tableContainer}>
            <DataTable style={[styles.dataTable, { backgroundColor: '#afbe94' }]}>
              <DataTable.Header>
                <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('name')}
              >
                Name
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('cnic')}
              >
                CNIC
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('tehsil')}
              >
                Tehsil
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('category')}
              >
                Category
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('assign_to')}
              >
                Member
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('ddverify')}
              >
                Status
              </DataTable.Title>
                {/* Add more headers as needed */}
              </DataTable.Header>
              
              {thirdTableData.map((item, index) => (
                <TouchableOpacity
                key={index}
                onPress={() => { handleDetailsPress(item)
                  // Handle the touch event for the name row
                  console.log(`row touched: ${item.name},${item.cnic},${item.tehsil},${item.category},${item.assign_to},${item.ddverify}`);
                }}
              >
               <DataTable.Row key={index}>
               <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                 {item.name}
               </DataTable.Cell>
               <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                 {item.cnic}
               </DataTable.Cell>
               <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                 {item.tehsil}
               </DataTable.Cell>
               <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                 {item.category}
               </DataTable.Cell>
               <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                 {item.assign_to}
               </DataTable.Cell>
               <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                 {item.ddverify}
               </DataTable.Cell>
             </DataTable.Row>
             </TouchableOpacity>
              ))}
            </DataTable>
          </View>
      )}
      {/* fourth datatable */}
      {showFourthTable && (
        <View style={styles.tableContainer}>
          <DataTable style={[styles.dataTable, { backgroundColor: '#afbe94' }]}>
            <DataTable.Header>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('name')}
              >
                Name
              </DataTable.Title>
              <DataTable.Title
                style={[styles.dataTableTitle, styles.tableHeader]}
                onPress={() => handleSort('cnic')}
              >
                CNIC
              </DataTable.Title>
              {/* Add more headers as needed */}
            </DataTable.Header>

            {fourthTableData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleDetailsPress(item);
                  console.log(`row touched: ${item.name},${item.cnic}`);
                }}
              >
                <DataTable.Row key={index}>
                  <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                    {item.name}
                  </DataTable.Cell>
                  <DataTable.Cell style={[styles.dataTableCell, styles.tableCell]}>
                    {item.cnic}
                  </DataTable.Cell>
                  {/* Add more cells as needed */}
                </DataTable.Row>
              </TouchableOpacity>
            ))}
          </DataTable>
        </View>
      )}
    </View>
  </ScrollView>

  </ImageBackground>
</View>

</View>

  );
};

const styles = StyleSheet.create({
  dataTableTitle: {
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  dataTableCell: {
    flex: 1,
    textAlign: 'center',
    color: 'white', // set text color to white
  },
  dataTable: {
    marginTop: 20,
      borderRadius: 10,
  },
  logoutIcon: {
    width: 20,
    height: 20,
    marginRight: 5, // Adjust this value for proper spacing
  },
  text: {
    color: '#002D62',
    fontSize: 12,
    // fontStyle: 'CenturyGothic',
    fontWeight: 'bold',
  },
  ButtonStyle: {
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: 'white',
    marginLeft: '3%',
    marginTop: 10,
    fontFamily: 'sans-serif',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    // backgroundColor: '#002D62',
  },
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: '10%',
    paddingBottom: '20%',
  },
  circleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  circleContainer: {
    alignItems: 'center',
  },
  
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
  },
  
  circleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16, // Adjust the font size as needed
    fontWeight: 'bold', // Adjust the font weight as needed
  },
  
  labelText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5, // Adjust the marginTop to control the spacing between circle and text
  },
  
  line: {
    height: 2,
    width: 70,
    backgroundColor: '#fff',
    marginTop: -25, // Adjust the marginTop to control the vertical positioning of the line
  },
  tableContainer: {
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    // borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',

    color:'#fff'
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    textAlign: 'center',
    color:'#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
});

export default pwd;
