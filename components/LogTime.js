import React, {Component} from 'react';
import DatePicker from 'react-native-datepicker';
import RNPickerSelect from 'react-native-picker-select';
import {getProjects, getIssues, getUsers, postTime} from '../services/Api';

import {connect} from 'react-redux';
import {addPlace} from '../Root/actions/place';

import {CheckBox} from 'react-native-elements';
import {
  StyleSheet,
  ScrollView,
  View,
  Platform,
  Button,
  Text,
  FlatList,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TextInput} from 'react-native-gesture-handler';

export class LogTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      issues: [],
      user: '',
      apiKey: '',
      checked: false,
      hours: '',
      comment: '',
      activity: 'Activity:',
      activityId: '',
      overTime: false,
      placeName: '',
      places: [],
      date: '2019-10-11',
    };
  }
  placeSubmitHandler = () => {
    this.props.add(this.state.apiKey);
  };
  trackTime = () => {
    console.log(this.state.activityId);
    postTime({
      spent_on: this.state.date,
      hours: this.state.hours,
      comments: this.state.comment,
      activity_id: this.state.activityId,
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.dir(error);
      });
  };

  checkOverTime = () => {
    this.setState({checked: !this.state.checked});
  };
  render() {
    const placeholder = {
      label: this.state.activity,
      value: this.state.activity,

      fontSize: 12,
      fontWeight: 'bold',
      color: 'purple',
    };
    return (
      <View style={styles.body}>
        <View style={styles.profile}>
          <TextInput
            style={{
              height: 50,
              width: '90%',
              borderColor: '#FFF',
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
              margin: 5,
              backgroundColor: 'white',
            }}
            placeholder="Enter your Api Key"
            onChangeText={apiKey => this.setState({apiKey})}
            value={this.state.apiKey}
          />
          <View style={styles.buttonContainer}>
            {Platform.OS == 'ios' ? (
              <Button
                onPress={this.placeSubmitHandler}
                title="Submit"
                color="#FFF"
              />
            ) : (
              <Button onPress={this.placeSubmitHandler} title="Submit" />
            )}
          </View>
        </View>
        <View style={styles.container} />
        <View style={styles.inputBody}>
          <DatePicker
            style={{width: 200}}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2000-05-01"
            maxDate="2020-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={date => {
              this.setState({date: date});;
            }}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Hours"
            placeholderTextColor="#DDD"
            onChangeText={hours => this.setState({hours})}
            value={this.state.hours}
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Comment"
            placeholderTextColor="#DDD"
            onChangeText={comment => this.setState({comment})}
            value={this.state.comment}
          />
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder="3333"
            onValueChange={(value, key) =>
              this.setState({activity: value, activityId: key})
            }
            // eslint-disable-next-line react/jsx-no-duplicate-props
            placeholder={placeholder}
            items={[
              {label: '', value: '', key: ''},
              {label: '', value: '', key: ''},
              {label: '', value: '', key: ''},
              {label: '', value: '', key: ''},
              {label: '', value: '', key: ''},
              {label: '', value: '', key: ''},
              {label: '', value: '', key: ''},
              {label: 'Design', value: 'Design', key: '8'},
              {label: 'Development', value: 'Development', key: '9'},
              {label: 'Management', value: 'Management', key: '10'},
              {label: 'Testing', value: 'Testing', key: '11'},
              {label: 'Automation QA', value: 'Automation QA', keyId: '12'},
            ]}
          />
          <CheckBox
            center
            title="OverTime"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={this.state.checked}
            onPress={this.checkOverTime}
          />
        </View>
        <View style={styles.buttonContainer}>
          {Platform.OS == 'ios' ? (
            <Button onPress={this.trackTime} title="Submit" color="#FFF" />
          ) : (
            <Button onPress={this.trackTime} title="Submit" />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  placeInput: {
    width: '70%',
  },
  placeButton: {
    width: '30%',
  },
  listContainer: {
    width: '100%',
  },
  chosenDate: {
    flex: 1,
    justifyContent: 'center',
  },
  inputBody: {
    marginTop: 30,
    marginBottom: 20,
    width: '90%',
    display: 'flex',
    alignItems: 'center',
  },
  inputStyle: {
    height: 50,
    width: '100%',
    borderColor: '#DDD',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: '#FFF',
    margin: 5,
    backgroundColor: '#38b5a6',
  },
  buttonContainer: {
    height: 50,
    width: '50%',
    borderColor: '#FFF',
    borderRadius: 5,
    padding: 5,

    ...Platform.select({
      ios: {
        backgroundColor: '#30d1bc',
      },
      android: {},
    }),
  },
  body: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    margin: 0,
    width: '100%',
  },
  profile: {
    backgroundColor: '#38b5a6',
    height: 150,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: Colors.black,
    borderBottomWidth: 1,
  },
  image: {
    width: '30%',
    borderRadius: 10,
    height: 100,
    borderStyle: 'solid',

    backgroundColor: '#FFF',
  },
  profileText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: 100,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 25,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,

    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});
const mapStateToProps = state => {
  return {
    places: state.places.places,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: name => {
      dispatch(addPlace(name));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogTime);
