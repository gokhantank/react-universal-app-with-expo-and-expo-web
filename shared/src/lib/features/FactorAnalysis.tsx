import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { TEAMS, teamDataConfig, type Team } from '../data/team-data';

export function FactorAnalysis() {
  const [selectedTeam, setSelectedTeam] = useState<Team>('Engineering Product');
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  
  const teamData = teamDataConfig[selectedTeam];
  const factors = teamData.factorData;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <Text style={styles.title}>Factor analysis</Text>

      {/* Filters */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowTeamDropdown(!showTeamDropdown)}
        >
          <Text style={styles.filterText}>{selectedTeam} ▼</Text>
          {showTeamDropdown && (
            <View style={styles.dropdownMenu}>
              {TEAMS.map((team) => (
                <TouchableOpacity
                  key={team}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedTeam(team);
                    setShowTeamDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{team}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Last 30 days ▼</Text>
        </TouchableOpacity>
      </View>

      {/* Factor Grid */}
      <View style={styles.gridContainer}>
        {factors.map((factor, index) => (
          <View key={index} style={styles.factorCard}>
            <View
              style={[
                styles.colorBar,
                { backgroundColor: factor.color },
              ]}
            />
            <Text style={styles.factorName}>{factor.name}</Text>
            <Text style={styles.factorValue}>{factor.value}%</Text>
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${factor.value}%`,
                    backgroundColor: factor.color,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  filterButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    position: 'relative',
    zIndex: 101,
    overflow: 'visible',
  },
  filterText: {
    fontWeight: '600',
    color: '#2D3748',
    fontSize: 14,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    left: 0,
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    zIndex: 9999,
    minWidth: 180,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  dropdownItemText: {
    color: '#2D3748',
    fontSize: 14,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  factorCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  colorBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  factorName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  factorValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 8,
  },
  barContainer: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
});
