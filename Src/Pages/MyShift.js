import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {AllShift, CancelBookedShift} from '../Api/Api';

const MyShift = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    AllShift().then(res => {
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

  const CancelShift = id => {
    CancelBookedShift(id).then(res => {
      console.log(res);
    });
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
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
                        <TouchableOpacity
                          style={{
                            width: 100,
                            backgroundColor: 'white',
                            height: 35,
                            borderRadius: 20,
                            borderWidth: 1,
                            marginRight: 10,
                            borderColor:
                              item.startTime > new Date().getTime()
                                ? 'pink'
                                : 'black',
                          }}>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: '600',
                                color:
                                  item.startTime > new Date().getTime()
                                    ? 'red'
                                    : 'black',
                              }}>
                              Cancel
                            </Text>
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

export default MyShift;
