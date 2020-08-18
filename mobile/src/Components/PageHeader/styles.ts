
import {StyleSheet} from 'react-native'
const styles = StyleSheet.create(
    {
        container: {
            padding: 30,
            backgroundColor: '#8257ec',
        },

        topBar: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },

        title: {
            fontFamily: 'Archivo_700Bold',
            color: '#fff',
            fontSize:24,
            lineHeight: 32,
            maxWidth: 160,
            marginVertical: 40,
            
        },

        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }

    }
)


export default styles