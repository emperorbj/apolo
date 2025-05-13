import { useState,useEffect } from 'react';
import {
    View,
    TextInput,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchBlogs, fetchAllVideos } from '@/api/myApi';
import { useRouter } from 'expo-router';
import COLORS from '@/constants/constants';
import Loader from '@/components/Loader';
import Error from '@/components/Error';
import { Ionicons } from '@expo/vector-icons';
import { formatDate } from '@/lib/formatDate';
import { Image } from 'expo-image';
import LottieView from 'lottie-react-native';

interface Blog {
    _id: string;
    title: string;
    image: string;
    category: string;
    createdAt: string;
}




const searchBar = () => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')

    const { data: blogData, isLoading: blogLoading, isError: blogError, error:blogErr } = useQuery({
        queryKey: ['blogs',searchQuery],
        queryFn: () => fetchBlogs(1,6,'',searchQuery?.toLocaleLowerCase().trim()),
        enabled: !!searchQuery
    })

    console.log(searchQuery)

    const blogs = blogData?.blogs || [];

    const renderItems  = ({ item } : { item: Blog }) => {
        
            return (
                <TouchableOpacity style={styles.topicCardContainer}
                 onPress={() => router.push(`/blog/${item?._id}`)}>
                    <View style={styles.topicCardImageContainer}>
                        <Image source={{ uri: item?.image }}
                         style={styles.topicCardImage} contentFit='cover' />
                    </View>
                    <View style={{ width: "70%", height: "100%", padding: 10, justifyContent: "center" }}>
                        <Text style={[styles.topicCardText,]}>{item?.title }</Text>
                        <Text style={{ color: "#6C757D", fontSize: 12 }}>{item?.createdAt }</Text>
                    </View>
                </TouchableOpacity>
            )

    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <Ionicons name="search-outline" size={20} color={COLORS.primary} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search blogs or videos..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoFocus
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Ionicons name="close-circle" size={20} color="gray" />
                    </TouchableOpacity>
                )}
            </View>

            {blogLoading  ? (
                <Loader />
            ) : blogError  ? (
                <Error bError={blogError}/>
            ) : blogs?.length === 0 && searchQuery ? (
                <View>
                    <LottieView
                        source={require('@/assets/not.json')}
                        autoPlay
                        loop={true}
                        style={{ width: 300, height: 250 }}
                    />
                    <Text>No Results found</Text>
                </View>
            ) : (
                <FlatList
                    data={blogs}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItems}
                    contentContainerStyle={styles.resultsList}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    )
}

export default searchBar



const styles = StyleSheet.create({
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
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    resultsList: {
        paddingBottom: 20,
    },
});