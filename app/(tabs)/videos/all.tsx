import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAllVideos } from '@/api/myApi';
import { useRouter } from 'expo-router';
import { formatDate } from '@/lib/formatDate';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Loader from '@/components/Loader';

export default function AllVideos() {
  const router = useRouter();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['all-videos'],
    queryFn: ({ pageParam = 1 }) => fetchAllVideos(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < lastPage.totalPage) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  if (isLoading) return <Loader/>;

  const allVideos = data?.pages.flatMap((page) => page.videos);

  return (
    <LinearGradient colors={["#FFFFFF", "#D3D3D3"]} style={styles.linear}>
      <FlatList
        data={allVideos}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16 }}
        numColumns={2}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator size="small" color="#00FFAB" /> : null
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.videoCardVertical}
            onPress={() => router.push({ pathname: '/video-player', params: { url: item.youtubeUrl } })}
          >
            <Image
              style={styles.thumbnailVertical}
              source={{ uri: item?.thumbnailUrl }}
              contentFit="cover"
            />
            <Text style={styles.videoTitleVertical} numberOfLines={2}>{item?.title}</Text>
            <Text style={styles.Date}>{formatDate(item?.createdAt)}</Text>
          </Pressable>
        )}
      />
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

    videoContainer: {
        marginTop: 10,
        paddingHorizontal: 12
    },
    newVideo: {
        fontSize: 20,
        fontWeight: '500',
        color: "#00FFAB",
        fontFamily: "mySecondFont"
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



    videoCardVertical: {
        // Calculate width: (screen width - container padding - gaps) / 3
        width: 160,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#1B1212",
        marginBottom: 8,
        marginHorizontal: 3,
        paddingBottom: 6
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