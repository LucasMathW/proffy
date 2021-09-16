import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import styles from './styles'
import PageHeader from '../../Components/PageHeader'
import TeacherItem, { Teacher } from '../../Components/TeacherItem'
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api'
import { useFocusEffect } from '@react-navigation/native'


function TeacherList(){

    const [isFilterVisible, setIsFilterVisible] = useState(false);
    
    const [teachers, setTeacher] = useState([]);
    const [favorites, setFavorites] = useState<Number[]>([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response)
                const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })

                setFavorites(favoritedTeachersId)
            }
        })
    }

    useFocusEffect(()=>{
        loadFavorites();
    })

    function handlerTogglerFiltersVisible(){
        setIsFilterVisible(!isFilterVisible);
    }

    async function handlerFiltersSubmit(){

        loadFavorites();

        const response = await api.get('classes', {
            params: { 
                subject,
                week_day,
                time
            }
        });

        console.log(subject),
        console.log(week_day),
        console.log(time),
        

        setTeacher(response.data)
        setIsFilterVisible(!isFilterVisible);

    }

    return(
        <View style={styles.container}>
           <KeyboardAvoidingView behavior="position"> 
            <PageHeader 
            title="Proffys disponíveis"
            headerRight={(
                <BorderlessButton onPress={handlerTogglerFiltersVisible}>
                    <Feather name='filter' size={20} color="#fff" ></Feather>
                </BorderlessButton>
            )}
            >
               { isFilterVisible && (

                    <View style={styles.searchForm}>
                            <Text style={styles.label}>Matéria</Text>
                            <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder='Qual a matéria?'
                            placeholderTextColor='#c1bccc'
                            >

                            </TextInput>

                            <View style={styles.inputGroup}>
                                
                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Dia da semana</Text>
                                    <TextInput 
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholder='Qual o dia'
                                    placeholderTextColor='#c1bccc'>

                                    </TextInput>
                                </View>


                                <View style={styles.inputBlock}>
                                    <Text style={styles.label}>Horário</Text>
                                    <TextInput 
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder='Qual horário' 
                                    placeholderTextColor='#c1bccc'>

                                    </TextInput>

                                </View>

                            </View>

                           <RectButton onPress={handlerFiltersSubmit} style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>Filtrar</Text>
                            </RectButton>

                        </View>)}
            </PageHeader>
            </KeyboardAvoidingView>
            <ScrollView 
            style={styles.teacherList}
            contentContainerStyle={{
                 paddingHorizontal: 16,
                 paddingBottom: 16,
                }}
            >

            {teachers.map((teacher: Teacher) => {
                return (
                    <TeacherItem 
                    key={teacher.id} 
                    teacher={teacher}
                    favorited={favorites.includes(teacher.id)}
                    />)
            })}    

            </ScrollView>
            
        </View>
    )       
}

export default TeacherList