import { View, Text,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router';

const imageMap: Record<string, any> = {
    'textual.jpg': require('@/assets/textual.jpg'),
    'history.jpg': require('@/assets/history.jpg'),
    'science.jpg': require('@/assets/science.jpg'),
    'evil.jpg': require('@/assets/evil.jpg'),
  };

const TopicCard = ({image,title,text,color,routing}:any) => {

  const router = useRouter()
  return (
    <TouchableOpacity style={styles.topicCardContainer} onPress={()=>router.push({pathname:`(tabs)/blogs/${routing}`})}>
        <View style={styles.topicCardImageContainer}>
            <Image source={imageMap[image]} style={styles.topicCardImage} contentFit='cover'/>
        </View>
        <View style={{width:"70%",height:"100%",padding:10,justifyContent:"center"}}>
            <Text style={[styles.topicCardText,{color:color}]}>{title}</Text>
            <Text style={{color:"#6C757D",fontSize:12}}>{text}</Text>
        </View>
      </TouchableOpacity>
  )
}

export default TopicCard


const styles = StyleSheet.create({
  topicCardContainer: {
    width: "100%",
    height:100,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 6,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
},
topicCardImageContainer: {
    width: '30%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
},
    topicCardImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    topicCardText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
});