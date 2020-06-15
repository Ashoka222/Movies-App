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
import { FlatList, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';

export class MovieDetailsScreen extends Component {
    constructor() {
        super()
        this.state = {
            movieDetails: {}
        }
    }

    componentDidMount() {
        this.setState({
            movieDetails: this.props.route.params.item
        })
    }

    // onMoviePress = (item) => {
    //     alert('Movie: ' + JSON.stringify(item))
    // }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => goBack()}
                            style={{ padding: 5 }}
                        >
                            <Text style={{ fontSize: 15, textAlign: 'center' }}>Back</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Text style={{ fontSize: 30, textAlign: 'center' }}>Movie List</Text>
                        </View>
                    </View>
                    <ScrollView style={styles.body}>
                        <View
                            style={styles.sectionContainer}
                        >
                            <Image
                                style={styles.coverImg}
                                source={this.state.movieDetails.backdrop_path == null ?
                                    { uri: 'https://seawardfitness.com/wp-content/uploads/2020/04/placeholder.png' }
                                    :
                                    { uri: 'http://image.tmdb.org/t/p/w500/' + this.state.movieDetails.backdrop_path }}
                            />
                            <View style={{ padding: 10 }}>
                                <Text style={styles.sectionTitle}>{this.state.movieDetails.title}</Text>
                                <Text style={styles.sectionDescription}>{this.state.movieDetails.overview}</Text>
                                <Text style={styles.avgVoting}>Average Voting: {this.state.movieDetails.vote_average}/10</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.highlight}>Released: {this.state.movieDetails.release_date}</Text>
                                    <Text style={styles.highlight}>Popularity: {this.state.movieDetails.popularity}</Text>
                                </View>
                            </View>


                        </View>
                    </ScrollView>
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
        height: 200,
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
        marginHorizontal: 15,
        marginVertical: 5,
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
        // height: 230,
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
        fontStyle: 'italic'
    },
    avgVoting: {
        color: Colors.dark,
        fontSize: 16,
        fontWeight: '600',
        paddingVertical: 20,
        // paddingRight: 12,
        textAlign: 'center',
    },
});


export default MovieDetailsScreen;