import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';
import { useAppDispatch } from '../redux/store';
import { addPlaylist } from '../redux/slices/playlistSlice';

const CreatePlaylistScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isCollaborative, setIsCollaborative] = useState(false);

  const handleCreate = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a playlist name');
      return;
    }

    const newPlaylist = {
      id: `pl-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      coverArt: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400',
      createdBy: 'You',
      userId: 'u1',
      songs: [],
      songCount: 0,
      totalDuration: 0,
      isPublic,
      isCollaborative,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch(addPlaylist(newPlaylist));
    navigation.goBack();
  };

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0D1225']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Playlist</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Cover Art Placeholder */}
        <TouchableOpacity style={styles.coverContainer}>
          <View style={styles.coverPlaceholder}>
            <Text style={styles.coverIcon}>🎵</Text>
            <Text style={styles.coverText}>Add Cover</Text>
          </View>
        </TouchableOpacity>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="My Awesome Playlist"
              placeholderTextColor={Colors.text.muted}
              value={name}
              onChangeText={setName}
              autoFocus
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description (optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add a description..."
              placeholderTextColor={Colors.text.muted}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>Public Playlist</Text>
              <Text style={styles.switchDesc}>Anyone can see and follow</Text>
            </View>
            <Switch
              value={isPublic}
              onValueChange={setIsPublic}
              trackColor={{ false: Colors.text.muted, true: 'rgba(139, 92, 246, 0.4)' }}
              thumbColor={isPublic ? Colors.secondary : Colors.text.tertiary}
            />
          </View>

          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>Collaborative Playlist</Text>
              <Text style={styles.switchDesc}>Friends can add songs</Text>
            </View>
            <Switch
              value={isCollaborative}
              onValueChange={setIsCollaborative}
              trackColor={{ false: Colors.text.muted, true: 'rgba(139, 92, 246, 0.4)' }}
              thumbColor={isCollaborative ? Colors.secondary : Colors.text.tertiary}
            />
          </View>
        </View>

        {/* Create Button */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.createGradient}>
            <Text style={styles.createText}>Create Playlist</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing.xl, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, marginBottom: Spacing.xl },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surface.glass, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 20, color: Colors.text.primary },
  headerTitle: { fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  coverContainer: { alignItems: 'center', marginBottom: Spacing['2xl'] },
  coverPlaceholder: { width: 180, height: 180, borderRadius: BorderRadius.xl, backgroundColor: Colors.surface.card, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.surface.glassLight, borderStyle: 'dashed' },
  coverIcon: { fontSize: 48, marginBottom: Spacing.sm },
  coverText: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary },
  form: { gap: Spacing.lg, marginBottom: Spacing['2xl'] },
  inputGroup: { gap: Spacing.sm },
  inputLabel: { fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.medium, color: Colors.text.secondary, letterSpacing: Typography.letterSpacing.wide },
  input: { backgroundColor: Colors.inputBg, borderWidth: 1, borderColor: Colors.inputBorder, borderRadius: BorderRadius.md, paddingHorizontal: Spacing.base, paddingVertical: 14, fontSize: Typography.fontSize.md, color: Colors.text.primary },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.sm },
  switchLabel: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.medium, color: Colors.text.primary },
  switchDesc: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, marginTop: 2 },
  createButton: { borderRadius: BorderRadius.base, overflow: 'hidden', ...Shadows.glow },
  createGradient: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  createText: { fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, letterSpacing: Typography.letterSpacing.wide },
});

export default CreatePlaylistScreen;
