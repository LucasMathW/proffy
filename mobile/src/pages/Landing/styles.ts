import { StyleSheet } from 'react-native'

const styles = StyleSheet.create(
   {
      container:{
         flex: 1,
         backgroundColor: '#8257E5',
         justifyContent: 'center',
         padding: 40,
      },

      baner:{
         width: '100%;',
         resizeMode: 'contain' 
      },

      title : {
        color:'#fff',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 80,
        
      },

      titleBold : {
         fontWeight: 'bold'
      },
   } 
)

export default styles;