import {
  Pressable, Text, TouchableOpacity, View, StyleSheet,
  FlatList, Dimensions, ScrollView
} from "react-native";
import { Link } from "expo-router";
import LogOut from "@/components/Logout";
import { BlurView } from "expo-blur"
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@tanstack/react-query";
import { fetchVideos } from "@/api/myApi";

import { formatDate } from "@/lib/formatDate";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import * as Location from "expo-location";
import { useState } from "react";
import Carousel from 'react-native-reanimated-carousel';
import TopicCard from "@/components/TopicCard";
import COLORS from "@/constants/constants";
import { useRouter } from 'expo-router';


const { width } = Dimensions.get("window");

export default function Home() {
  const router = useRouter()
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const imageSources = [
    require('@/assets/p1.jpg'),
    require('@/assets/p2.jpg'),
    require('@/assets/p3.jpg'),
    require('@/assets/p4.jpg'),
  ];


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Permission denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      let geo = await Location.reverseGeocodeAsync(loc.coords);
      if (geo.length > 0 && geo[0].isoCountryCode) {
        setCountryCode(geo[0].isoCountryCode.toLowerCase());
      }
    })();
  }, []);

  const { user, login } = useAuthStore() as any

  const { data, isError, isLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos
  })

  if (isLoading) {
    return (
      <Loader />
    )
  }

  if (isError) {
    return (
      <Error />
    )
  }

  const { newVideos, oldVideos } = data as any;


  return (

    <LinearGradient colors={["#FFFFFF", "#D3D3D3"]} style={styles.linear}>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ flex: 1 }}>

          
<View style={{ flexDirection: "row", alignItems: "center",
  justifyContent: "space-between", paddingHorizontal: 12 }}>
          {countryCode && (
            <Image
              source={{ uri: `https://flagcdn.com/w40/${countryCode}.png` }}
              style={{ width: 30, height: 20,borderWidth:2, marginRight: 8, borderRadius: 3 }}
          />
          )}
          <Image source={{ uri: user?.imageURL }}
              style={styles.logo}

            />
          </View>

        <View style={{
          flexDirection: "row", alignItems: "center",
          justifyContent: "space-between", paddingHorizontal: 12
        }}>


          <View>
            <Text style={{ color: "#B08968",fontFamily:"myFont",
               fontSize: 20, marginTop:15, fontWeight: "500" }}>Welcome back, {user?.name.split(" ")[1]}!</Text>
            <Text style={{ color: "#00FFAB", fontSize: 15, fontWeight: "500" }}></Text>
          </View>
          
        </View>
        <View  style={styles.headerContainer}>
          <View></View>
          <Pressable style={{backgroundColor: COLORS.primary ,padding:5, alignItems:"center",borderRadius:50}}>
            <Ionicons name="search-outline" size={25} color={"white"} />
          </Pressable>
        </View>

        {/* <View>
        <LogOut />
      </View> */}
        {/* TOP NEW VIDEOS */}
        <View style={styles.videoContainer}>
        
          <Carousel
          style={{borderRadius:10}}
    width={width * 0.9}
    height={200}
    autoPlay
    data={imageSources}
    scrollAnimationDuration={3000}
    renderItem={({ item }) => (
      <Image
        source={item}
        style={{ width: '100%', height: '100%', borderRadius: 10 }}
        contentFit="cover"
      />
    )}
    loop
  />
        </View>

        <View style={styles.videoContainer}>

          <View style={styles.recentViewSection}>
            <Text style={styles.recentText}>Check our blogs</Text>
            
          </View>
          {/* RECENT VIDEOS DISPLAY */}

        
            <TopicCard 
            title="Textual Criticism"
            image="textual.jpg"
            text="criticism on the text of the Bible"
            color="#6C757D"
            routing="textual"
            />

          <TopicCard 
            title="Historical Evidence"
            image="history.jpg"
            text="historical evidence for the Bible"
            color="#B08968"
             routing="history"
            />
            
            <TopicCard 
            title="Science and Faith"
            image="science.jpg"
            text="science and the Bible"
            color="#3A86FF"
             routing="science"
            />

          <TopicCard 
            title="Philosophy of Evil"
            image="evil.jpg"
            text="philosophical arguments for evil"
            color="#636B2F"
             routing="evil"
            
            />

<View style={styles.recentViewSection}>
          <Text style={styles.recentText}>Recent streams</Text>
          <TouchableOpacity style={styles.viewAll} onPress={() => router.push({ pathname: '/videos/all',})}>
            <Text style={{color:COLORS.primary}}>View All</Text>
          </TouchableOpacity>
        </View>
      
          <FlatList
            data={oldVideos}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ gap: 8, paddingBottom: 50 }}
            showsVerticalScrollIndicator={false}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.videoCardVertical} onPress={()=>router
.push({ pathname: '/video-player', params: { url: item.youtubeUrl } })}>
              
                <Image
                  style={styles.thumbnailVertical}
                  source={{ uri: item?.thumbnailUrl }}
                  contentFit="cover"
                />
                <Text style={styles.videoTitleVertical} numberOfLines={2} ellipsizeMode="tail">{item?.title}</Text>
                <Text style={styles.Date}>{formatDate(item?.createdAt)}</Text>
              </TouchableOpacity>
            )}
          />

        </View>
      </ScrollView>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  linear: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,

    // Android shadow
    elevation: 8,
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    marginTop: 8,
    alignItems: "center",
    paddingRight: 4,
    paddingVertical: 4,
    borderRadius: 40,
    justifyContent: "space-between",
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
},
  logo: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  viewAll:{
    flexDirection:'row',
    gap:5,
    borderRadius:50,
    padding:4,
    backgroundColor:"rgba(255,255,255,0.4)",
    borderWidth:1,
    borderColor:COLORS.primary,
    alignItems:'center',
    justifyContent:'center'
  },
  videoContainer: {
    marginTop: 10,
    paddingHorizontal: 12
  },
  newVideo: {
    fontSize: 20,
    fontWeight: '500',
    color: "#3A86FF",
    fontFamily:"mySecondFont"
  },
  videoCardHorizontal: {
    width: 200,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#1B1212",
  },
  thumbnailHorizontal: {
    width: "100%",
    height: 120,
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
    marginLeft: 5
  },
  Date: {
    fontSize: 10,
    fontWeight: "200",
    color: "white",
    marginLeft: 5
  },
 
  recentViewSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding:10
  },
  recentText: {
    fontSize: 20,
    fontWeight: '500',
    color: "#3A86FF",
    fontFamily:"mySecondFont"
  },


  videoCardVertical: {
    // Calculate width: (screen width - container padding - gaps) / 3
    width: 160,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#1B1212",
    marginBottom: 8,
    marginHorizontal: 3,
    paddingBottom: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  thumbnailVertical: {
    width: "100%",
    height: 100, // Smaller height for grid
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  videoTitleVertical: {
    fontSize: 13,
    fontWeight: "400",
    color: "white",
    marginLeft: 5,
    marginTop: 5,
    marginRight: 5,
  },
})


