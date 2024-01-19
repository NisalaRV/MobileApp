import React from 'react'
import { StyleSheet, View,ImageProps, ImageBackground } from 'react-native'

interface ImageBackgroundInfoProps{
    EnablebackHandler:boolean;
    imagelink_portrait :ImageProps;
    type:string;
    id: string;
    favourite: boolean;
    name: string;
    special_ingredient: string;
    ingredients: string;
    average_rating: number;
    ratings_count: string;
    roasted: string;
    BackHandler?: any;
    ToggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
    EnablebackHandler,
    imagelink_portrait,
    id,
    favourite,
    name,
    special_ingredient,
    ingredients,
    average_rating,
    ratings_count,
    roasted,
    BackHandler,
    ToggleFavourite,
}) => {
  return (
    <View>
      <ImageBackground 
        source={ imagelink_portrait}
        style={styles.ItemBackgroundImage}
      >
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    ItemBackgroundImage:{
        width:'100%',
        aspectRatio:20 / 25,
        justifyContent:'space-between'
    },
});

export default ImageBackgroundInfo;

