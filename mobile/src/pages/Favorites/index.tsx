import React, {useState, useEffect} from 'react'
import { View, ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage'

import PageHeader from '../../Components/PageHeader'
import TeacherItem, {Teacher} from '../../Components/TeacherItem'

function Favorites(){
    
    const [favorites, setFavorites] = useState([]);
    
    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response => {
            if(response){
                const favoritedTeachers = JSON.parse(response)
                setFavorites(favoritedTeachers)
            }
        })
    }

    useFocusEffect(()=>{
        loadFavorites();
    });

    return(
        <View style={styles.container}>
            <PageHeader title="Meus Proffys favoritos"/>

            <ScrollView 
            style={styles.teacherList}
            contentContainerStyle={{
                 paddingHorizontal: 16,
                 paddingBottom: 24,
                }}
            >
                {favorites.map((teacher:Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id}
                            teacher={teacher}
                            favorited={true}
                        />
                    )                  
                })}
               
            </ScrollView>   
                

        </View>
    );
}

export default Favorites