/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Image,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { connect } from 'react-redux';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';

function GenreRenderItem({ item, onPress }) {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/genre/' + item.id + '/movies?api_key=68e82445c8842ba8616d0f6bf0e97a41')
            .then(response => response.json())
            .then(response => {
                setMovie(response.results)
            })
    });

    return (
        <View style={{ flex: 1, height: 300, padding: 5 }}>
            {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Image
                        style={styles.posterImg}
                        source={{ uri: 'https://revelwallpapers.net/media/wallpapers/drop-petal-shadow-dark-water.jpg' }}
                    /> */}
            <Text style={styles.sectionTitle}>{item.name}</Text>
            <FlatList
                horizontal={true}
                data={movie}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => onPress(item)}
                        style={styles.sectionContainer}
                    >
                        <Image
                            style={styles.coverImg}
                            source={item.backdrop_path == null ?
                                { uri: 'https://seawardfitness.com/wp-content/uploads/2020/04/placeholder.png' }
                                :
                                { uri: 'http://image.tmdb.org/t/p/w500/' + item.backdrop_path }}
                        />
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Image
                                    style={styles.posterImg}
                                    source={{ uri: 'https://revelwallpapers.net/media/wallpapers/drop-petal-shadow-dark-water.jpg' }}
                                /> */}
                            <Text style={styles.sectionTitle}>{item.title}</Text>
                            {/* </View> */}
                            <Text>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

export class MovieListScreen extends Component {
    state = {
        movieList: this.props.movieList
    }

    async componentDidMount() {
        await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=68e82445c8842ba8616d0f6bf0e97a41')
            .then(response => response.json())
            .then(response => {
                // alert(JSON.stringify(response.genres))
                this.props.setGenre(response.genres)
            })
    }

    onMoviePress = (item) => {
        // alert('Movie: ' + JSON.stringify(item))
        this.props.navigation.navigate("MovieDetailsScreen", {
            item: item
        })
    }

    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <View style={styles.container}>
                    <View>
                        <Text style={{ fontSize: 30, textAlign: 'center' }}>Movie List</Text>
                    </View>
                    <View style={styles.body}>
                        <FlatList
                            horizontal={false}
                            data={this.props.genre}
                            renderItem={({ item }) => (
                                <GenreRenderItem
                                    item={item}
                                    onPress={this.onMoviePress}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        ...Platform.select({
            ios: {
                paddingTop: 40,
            },
            android: {
                paddingTop: 0,
            },
        }),
    },
    coverImg: {
        height: 160,
        resizeMode: "cover",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    posterImg: {
        width: 40,
        height: 40,
        margin: 8,
        resizeMode: "stretch",
    },
    body: {
        backgroundColor: Colors.white,
        flex: 1
    },
    sectionContainer: {
        marginVertical: 8,
        marginRight: 20,
        marginLeft: 6,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 1,
        shadowColor: "#D3D3D3",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 3,
        width: 200,
        height: 230,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
        padding: 5,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

const mapDispatchToProps = (dispatch) => {
    return {
        setGenre: (data) => dispatch({
            type: 'SET_GENRE',
            payload: data
        })
    }
};

function mapStateToProps(state) {
    return {
        movieList: state.movieList,
        genre: state.genre
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieListScreen);
