import { Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export function Produto({ data, onDelete, onSelect, isSelected }) {
    return (
        <Pressable
            style={[styles.container, isSelected && styles.selected]}
            onPress={onSelect} // Chama a função de seleção ao clicar
        >
            <Text style={styles.text}>
                {data.quantidade} - {data.nome}
            </Text>
            <TouchableOpacity onPress={(e) => { e.stopPropagation(); onDelete(); }}>
                <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
            <TouchableOpacity onPress={(e) => { e.stopPropagation(); onSelect(); }}>
                <MaterialIcons name="edit" size={24} color="gray" />
            </TouchableOpacity>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#CECECE",
        padding: 24,
        borderRadius: 5,
        gap: 12,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#CECECE", // Borda inicial sem destaque
    },
    selected: {
        borderColor: "#007AFF", // Cor da borda quando selecionado
        borderWidth: 2,
    },
    text: {
        flex: 1,
    },
});
