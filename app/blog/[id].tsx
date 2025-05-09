import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import Markdown from 'react-native-markdown-display';
import { formatDate } from '@/lib/formatDate';
import { getSingleBlog } from '@/api/myApi';
import Loader from '@/components/Loader';
import LottieView from 'lottie-react-native';
import COLORS from '@/constants/constants';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const BlogDetails = () => {
  const router = useRouter()
  const { id } = useLocalSearchParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => getSingleBlog(id as string)
  })

  if (isLoading) return <Loader />;

  if (isError) (
    <View>
      <View>
        <LottieView
          source={require('@/assets/error.json')}
          autoPlay
          loop={true}
          style={{ width: 200, height: 100 }}
        />
      </View>
    </View>
  )

  const blog = data?.blog

  const handleNavigation = ()=> {
    if(!blog) return;

    const categoryLink = 
    blog?.category === 'philosophical' ? 'evil' :
    blog?.category === 'historical' ? 'history' :
    blog?.category === 'textual' ? 'textual' :
    blog?.category === 'scientific' ? 'science' : 'evil'

    router.push(`/(tabs)/blogs/${categoryLink}`)
  }

  return (
    <LinearGradient colors={['#FFFFFF', '#FFFFFF']} style={styles.linear}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={handleNavigation} >
            <Ionicons style={styles.arrowButton} name="arrow-back-circle-outline" 
            color={COLORS.primary} size={35}/>
          </TouchableOpacity>
          
          <View>

          </View>
        </View>
        <Image
          source={{ uri: blog?.image }}
          style={styles.thumbnail}
          contentFit="cover"
        />
        <View style={styles.content}>
           <Markdown style={markdownStyles}>{blog?.summary}</Markdown>
          <Text style={styles.metadata}>
            {blog?.category} • {formatDate(blog?.createdAt)}
          </Text>
         
          <View style={styles.divider} />
          <Markdown style={markdownStyles}>{blog?.content}</Markdown>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default BlogDetails


const styles = StyleSheet.create({
  linear: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  container: {
    padding: 16,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  content: {
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  metadata: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#D3D3D3',
    marginVertical: 16,
  },
  centerText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6C757D',
  },
  arrowButton:{
    color:COLORS.primary
  },
  arrowContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    paddingHorizontal:10
  }
});

const markdownStyles = {
  heading1: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginVertical: 6,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginVertical: 8,
  },
  body: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  list_item: {
    fontSize: 16,
    color: '#333',
  },
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    paddingLeft: 10,
    backgroundColor: '#f9f9f9',
  },
};