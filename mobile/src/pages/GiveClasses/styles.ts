import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#825DD5',
        justifyContent: 'center',
        padding: 40
    },

    content: {
        flex:1,
        justifyContent:"center",    
    },

    title: {
        fontFamily:'Archivo_700Bold',
        color: '#fff',
        fontSize: 32,
        lineHeight: 37,
        maxWidth: 180,
    },

    description: {
        marginTop: 24,
        color: '#d4c2ff',
        fontSize: 16,
        lineHeight: 26,
        fontFamily: "Poppins_400Regular",
        maxWidth: 240,
    },

    okButton: {
        backgroundColor: '#0d3',
        marginVertical: 40,
        borderRadius: 8,
        height: 58,
        alignItems: 'center',
        justifyContent: 'center'
    },

    okButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Archivo_700Bold',
        
    }
})

export default styles