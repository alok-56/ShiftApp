import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {AllShift, BookedShift, CancelBookedShift} from '../Api/Api';

const AvaliableShift = () => {
  const [data, setData] = useState([]);
  const [citys, setCity] = useState('');
  const [active, setActive] = useState('');
  useEffect(() => {
    AllShift().then(res => {
      const city = [...new Set(res.map(entry => entry.area))];
      setCity(city);
      let abb = groupShiftsByDay(res);
      let newdata = res.filter(item => item.booked === true);
      setData(abb);
    });
  }, []);

  const groupShiftsByDay = shifts => {
    const shiftsByDay = {};
    shifts.forEach(shift => {
      const day = new Date(shift.startTime).toLocaleDateString('en-US');
      if (!shiftsByDay[day]) {
        shiftsByDay[day] = [];
      }
      shiftsByDay[day].push(shift);
    });
    const result = [];
    for (const day in shiftsByDay) {
      result.push({day, shifts: shiftsByDay[day]});
    }
    return result;
  };

  const FilterShift = city => {
    AllShift().then(res => {
      let newShift = res.filter(shift => shift.area === city);
      let abb = groupShiftsByDay(newShift);
      setData(abb);
    });
  };

  const BookShift = id => {
    console.log(id);
    BookedShift(id).then(res => {
      console.log(res);
    });
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            marginTop: 20,
            height: 70,
            flexDirection: 'row',
          }}>
          {citys && citys.length > 0
            ? citys.map((item, index) => (
                <TouchableOpacity
                  onPress={() => (FilterShift(item), setActive(item))}
                  style={{
                    width: 120,
                    height: 45,
                    marginLeft: 10,
                    backgroundColor: item === active ? 'aqua' : '#fff',
                    borderRadius: 8,
                    elevation: 20,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '600',
                        color: '#000',
                      }}>
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            : null}
        </View>
      </ScrollView>

      <FlatList
        style={{marginTop: 5}}
        data={data}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '100%',
              }}>
              <View
                style={{
                  width: '100%',
                  height: 50,
                  backgroundColor: '#CBD2E1',
                  borderBottomWidth: 1,
                  borderBottomColor: 'grey',
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    marginLeft: 20,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: '600', color: 'black'}}>
                    {item.day}
                  </Text>
                  <Text
                    style={{marginLeft: 10, fontSize: 16, fontWeight: '400'}}>
                    {item.shifts.length} Shifts
                  </Text>
                </View>
              </View>
              {item.shifts && item.shifts.length > 0
                ? item.shifts.map((item, index) => (
                    <View
                      style={{
                        width: '100%',
                        height: 100,
                        backgroundColor: '#fff',
                        borderBottomWidth: 1,
                        borderBottomColor: 'grey',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          marginLeft: 20,
                          flexDirection: 'row',
                          width: '92%',
                          alignSelf: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '600',
                              color: 'black',
                            }}>
                            {item.area}
                          </Text>
                          <Text style={{fontSize: 16, fontWeight: '400'}}>
                            {new Date(item.startTime).toLocaleString('en-US', {
                              hour: 'numeric',
                              minute: 'numeric',
                            })}
                            {'   '}
                            {new Date(item.endTime).toLocaleString('en-US', {
                              hour: 'numeric',
                              minute: 'numeric',
                            })}
                          </Text>
                        </View>
                        {item.booked ? (
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: '600',
                              color: 'grey',
                            }}>
                            Booked
                          </Text>
                        ) : null}
                        <TouchableOpacity
                          onPress={() =>
                            !item.booked ? BookShift(item.id) : null
                          }
                          style={{
                            width: 100,
                            backgroundColor: 'white',
                            height: 35,
                            borderRadius: 20,
                            borderWidth: 1,
                            marginRight: 10,
                            borderColor: item.booked ? 'pink' : 'green',
                          }}>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            {item.booked ? (
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontWeight: '600',
                                  color: item.booked ? 'pink' : 'green',
                                }}>
                                Cancel
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontWeight: '600',
                                  color: item.booked ? 'pink' : 'green',
                                }}>
                                Book
                              </Text>
                            )}
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                : null}
            </View>
          );
        }}
      />
    </View>
  );
};

export default AvaliableShift;
