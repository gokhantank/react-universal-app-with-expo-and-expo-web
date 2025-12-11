import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TakeActionModalProps {
  visible: boolean;
  onClose: () => void;
}

const MEDIA_ICONS = [
  { id: 'photo', icon: '📷', label: 'Photo' },
  { id: 'shoutout', icon: '⭐', label: 'Shoutout' },
  { id: 'poll', icon: '📋', label: 'Poll' },
  { id: 'suggest', icon: '🎤', label: 'Suggest' },
  { id: 'files', icon: '📝', label: 'Files' },
];

const TABS = ['Vibe', 'Connect', 'Perform'];

export function TakeActionModal({ visible, onClose }: TakeActionModalProps) {
  const [activeTab, setActiveTab] = useState('Vibe');
  const [activeMedia, setActiveMedia] = useState('shoutout');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [companyValues, setCompanyValues] = useState<string>('');
  const [impact, setImpact] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<string>('');

  const isWeb = Platform.OS === 'web';
  const insets = useSafeAreaInsets();

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      tab: activeTab,
      media: activeMedia,
      user: selectedUser,
      companyValues,
      impact,
      team: selectedTeam,
    });
    onClose();
  };

  const content = (
    <View style={styles.modal}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.tabs}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        {/* Sub-tabs for media */}
        <View style={styles.mediaSection}>
          <Text style={styles.sectionLabel}>Media</Text>
          <View style={styles.mediaGrid}>
            {MEDIA_ICONS.map((media) => (
              <TouchableOpacity
                key={media.id}
                onPress={() => setActiveMedia(media.id)}
                style={[
                  styles.mediaIcon,
                  activeMedia === media.id && styles.activeMediaIcon,
                ]}
              >
                <Text style={styles.icon}>{media.icon}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sub-tabs for shoutout type */}
        <View style={styles.subtabSection}>
          <View style={styles.subtabs}>
            {['Media', 'Shoutout', 'Poll', 'Suggest', 'Files'].map((tab) => (
              <TouchableOpacity key={tab} style={styles.subtab}>
                <Text style={styles.subtabText}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Search users */}
        <TextInput
          style={styles.input}
          placeholder="Search for users here"
          placeholderTextColor="#9CA3AF"
          value={selectedUser}
          onChangeText={setSelectedUser}
        />

        {/* Company values dropdown */}
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Select related company values</Text>
        </TouchableOpacity>

        {/* Impact text area */}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="What was the impact (in a few sentences)?"
          placeholderTextColor="#D1D5DB"
          multiline
          numberOfLines={4}
          value={impact}
          onChangeText={setImpact}
          textAlignVertical="top"
        />

        {/* User/Team selector */}
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Select a user/team first</Text>
        </TouchableOpacity>

        {/* Submit button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Give shoutout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  if (isWeb) {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.backdrop}>
          <View style={styles.webModalContainer}>{content}</View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {content}
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
  },
  webModalContainer: {
    width: '90%',
    maxWidth: 600,
    maxHeight: '80vh',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    gap: 24,
  },
  tab: {
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#0EA5E9',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#0EA5E9',
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    fontSize: 20,
    color: '#9CA3AF',
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  mediaSection: {
    marginBottom: 24,
  },
  mediaGrid: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  mediaIcon: {
    width: '18%',
    aspectRatio: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeMediaIcon: {
    backgroundColor: '#0EA5E9',
    borderColor: '#0EA5E9',
  },
  icon: {
    fontSize: 24,
  },
  subtabSection: {
    marginBottom: 20,
  },
  subtabs: {
    flexDirection: 'row',
    gap: 8,
  },
  subtab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
  },
  subtabText: {
    fontSize: 12,
    color: '#6B7280',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  submitButton: {
    backgroundColor: '#0EA5E9',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 12,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});
