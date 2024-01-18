import React from 'react'
import { Dimensions, ImageBackground, ImageProps, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';

const CARD_WIDTH=Dimensions.get('window').width * 0.32;

interface BiriyaniCardProps{
    id:string;
    index:number;
    type: string;
    rosted: string;
    imagelink_square:ImageProps;
    name: string;
    special_ingredient:string;
    average_rating:number;
    price:any;
    buttonPressHandler: any;

}

const BiriyaniCard: React.FC<BiriyaniCardProps> = ({
    id,
    index,
    type,
    rosted,
    imagelink_square,
    name,
    special_ingredient,
    average_rating,
    price,
    buttonPressHandler
}) => {
  return (
    <LinearGradient
    start={{x:0, y:0}}
    end={{x:1, y:1}}
    style={styles.CardLinearGradientContainer}
    colors={[COLORS.primaryGreyHex,COLORS.primaryBlackHex]}
    >
        <ImageBackground source={imagelink_square}
         style={styles.CardImageBG}
            resizeMode="cover">
                <View style={styles.CardRatingContainer}>
                    <CustomIcon name={'star'} 
                        color={COLORS.primaryYellowHex} 
                        size={FONTSIZE.size_18}/>
                    <Text style={styles.CardRatingText}>{average_rating}</Text>
                </View>
         </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
    CardLinearGradientContainer:{},
    CardImageBG:{
        width:CARD_WIDTH,
        height:CARD_WIDTH,
        borderRadius:BORDERRADIUS.radius_20,
        marginBottom:SPACING.space_15,
        overflow:'hidden',
    },
    CardRatingContainer:{},
    CardRatingText:{},
});

export default BiriyaniCard

