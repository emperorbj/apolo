import { View, Text, StyleSheet, FlatList, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { fetchBlogs } from '@/api/myApi'
import { useInfiniteQuery } from '@tanstack/react-query';
import Loader from '@/components/Loader';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { formatDate } from '@/lib/formatDate';
const Evil = () => {
  const router = useRouter();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['blogs', 'philosophical'],
    queryFn: ({ pageParam = 1 }) => fetchBlogs(pageParam, 6, "philosophical"),
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < lastPage.totalPage) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  if (isLoading) return <Loader />;

  const allBlogs = data?.pages.flatMap((page) => page.blogs);


  


  return (

    <LinearGradient colors={["#FFFFFF", "#D3D3D3"]} style={styles.linear}>
      <FlatList
        data={allBlogs}
        keyExtractor={(item, index) => item?._id}
        contentContainerStyle={{ padding: 16 }}
        
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.topicCardContainer}
          onPress={() => router.push(`/blog/${item._id}`)}>
            <View style={styles.topicCardImageContainer}>
              <Image source={{ uri: item?.image }} style={styles.topicCardImage} contentFit='cover' />
            </View>
            <View style={{ width: "70%", height: "100%", padding: 10, justifyContent: "center" }}>
              <Text style={styles.topicCardText}>{item?.title}</Text>
              <Text style={{ color: "#6C757D", fontSize: 12 }}>{item?.category}</Text>
              <Text style={styles.Date}>{formatDate(item?.createdAt)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </LinearGradient>
  )
}

export default Evil

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

  topicCardContainer: {
    width: "100%",
    height: 100,
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
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
  },
  Date: {
    fontSize: 10,
    fontWeight: "200",
    color: "#B08968",
    marginLeft: 5
  },
});