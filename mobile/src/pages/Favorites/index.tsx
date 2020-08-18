import React from 'react'
import { View, ScrollView } from 'react-native'
import styles from './styles'

import PageHeader from '../../Components/PageHeader'
import TeacherItem from '../../Components/TeacherItem'
function Favorites(){
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
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
            </ScrollView>   
                

        </View>
    );
}

export default Favorites