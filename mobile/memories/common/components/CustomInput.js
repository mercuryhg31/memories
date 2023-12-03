import React from 'react';
import {TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';

// Custom input component for recycling throughout pages
const CustomInput = ({value, setValue, placeholder, isMultiLine, label, defaultValue}) => {
    return (
        <KeyboardAvoidingView
            style={isMultiLine ? styles.multiline_container: styles.singleline_container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            accessibilityLabel={label}
            >
            <TextInput
                value={value}
                onChangeText={setValue}
                defaultValue={defaultValue}
                placeholder={placeholder}
                style={styles.input}
            />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    singleline_container: {
        backgroundColor: 'white',
        width: '80%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,

        paddingHorizontal: 10,
        paddingVertical: 10,
    },

    multiline_container: {
        backgroundColor: 'white',
        width: '80%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        height: 110,

        paddingHorizontal: 10,
        paddingVertical: 10,
    },

    input: {},
});

export default CustomInput;