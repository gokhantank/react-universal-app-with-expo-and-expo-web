import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import { TEAMS, teamDataConfig, type Team } from '../data/team-data';
import { TakeActionModal } from '../components/TakeActionModal';

// --- REUSABLE COMPONENTS ---

// 1. A Card Component (White box with shadow)
const Card = ({ children, style }: { children: React.ReactNode; style?: any }) => (
  <View style={[styles.card, style]}>{children}</View>
);

// 2. Simple Gauge Visualization
const Gauge = ({ score }: { score: number }) => (
  <View style={styles.gaugeContainer}>
    <View style={styles.gaugeArch}>
      <View style={[styles.gaugeNeedle, { transform: [{ rotate: '-45deg' }] }]} />
    </View>
    <View style={styles.scoreContainer}>
      <Text style={styles.scoreText}>{score}</Text>
      <Text style={styles.scoreLabel}>VIBE SCORE</Text>
    </View>
    <View style={styles.gaugeIcons}>
      <Text style={{ fontSize: 20 }}>☹️</Text>
      <Text style={{ fontSize: 20 }}>😃</Text>
    </View>
  </View>
);

// 3. Simple Progress Bar
const ProgressBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <View style={styles.progressContainer}>
    <View style={styles.progressHeader}>
      <Text style={styles.metricLabel}>{label} (?)</Text>
    </View>
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${value}%`, backgroundColor: color }]} />
      {/* Triangle Marker */}
      <View style={[styles.marker, { left: `${value}%` }]} />
    </View>
    <View style={styles.scale}>
      <Text style={styles.scaleText}>-100</Text>
      <Text style={styles.scaleText}>100</Text>
    </View>
  </View>
);

// --- MAIN SCREEN ---
export function Dashboard() {
  const [selectedTeam, setSelectedTeam] = useState<Team>('Engineering Product');
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [showTakeActionModal, setShowTakeActionModal] = useState(false);
  
  const teamData = teamDataConfig[selectedTeam];
  const isWeb = Platform.OS === 'web';
  const { width } = Dimensions.get('window');
  const isLargeScreen = width > 800;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Insights dashboard</Text>
        </View>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setShowTakeActionModal(true)}
        >
          <Text style={styles.actionBtnText}>Take action</Text>
        </TouchableOpacity>
      </View>

      {/* FILTERS */}
      <View style={styles.filterRow}>
        <TouchableOpacity 
          style={styles.dropdown}
          onPress={() => setShowTeamDropdown(!showTeamDropdown)}
        >
          <Text style={styles.dropdownText}>{selectedTeam} ▼</Text>
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
        <View style={styles.dateFilter}>
          <Text style={styles.dateText}>Last 30 days ▼</Text>
        </View>
      </View>

      {/* TOP SECTION: GAUGE & CHART */}
      <View style={[styles.gridRow, isLargeScreen ? styles.row : styles.col]}>
        {/* Left: Vibe Score */}
        <Card style={styles.gaugeCard}>
          <Gauge score={teamData.vibeScore} />
        </Card>

        {/* Right: Score History (Simplified Line Chart Visual) */}
        <Card style={styles.chartCard}>
          <View style={styles.chartHeader}>
             <Text style={styles.sectionTitle}>Score history</Text>
             <Text style={styles.subText}>Last 9 months</Text>
          </View>
          <View style={styles.mockChart}>
             <View style={styles.chartLine} />
             <View style={[styles.dot, { left: '10%', top: '60%' }]} />
             <View style={[styles.dot, { left: '30%', top: '40%' }]} />
             <View style={[styles.dot, { left: '50%', top: '70%' }]} />
             <View style={[styles.dot, { left: '70%', top: '30%' }]} />
             <View style={[styles.dot, { left: '90%', top: '50%' }]} />
          </View>
        </Card>
      </View>

      {/* MIDDLE SECTION: KPIS */}
      <View style={styles.kpiRow}>
        <View style={styles.kpiItem}>
          <Text style={{ fontSize: 32, marginBottom: 5 }}>☹️</Text>
          <Text style={styles.centerText}>Your overall team Vibe is</Text>
          <Text style={[styles.centerText, styles.bold]}>{teamData.overallVibe}</Text>
        </View>
        
        <View style={styles.kpiItem}>
          <View style={styles.donutPlaceholder}><Text style={styles.bold}>{teamData.participation}%</Text></View>
          <Text style={styles.kpiLabel}>Participation</Text>
        </View>

        <View style={styles.kpiItem}>
           <View style={[styles.donutPlaceholder, { borderColor: '#4299E1' }]}><Text style={styles.bold}>{teamData.monthlyActiveUsers}%</Text></View>
           <Text style={styles.kpiLabel}>Monthly active users</Text>
        </View>

        <View style={styles.kpiItem}>
          <View style={styles.blueCircleIcon}><Text style={{color:'white'}}>👥</Text></View>
          <Text style={styles.linkText}>View team details</Text>
        </View>
      </View>

      {/* BOTTOM SECTION: METRICS */}
      <Text style={styles.sectionHeader}>Key performance metrics</Text>
      <View style={styles.metricsGrid}>
        {teamData.kpiData.map((kpi) => (
          <View key={kpi.label} style={isLargeScreen ? styles.halfWidth : styles.fullWidth}>
            <ProgressBar {...kpi} />
          </View>
        ))}
      </View>

      <TakeActionModal 
        visible={showTakeActionModal}
        onClose={() => setShowTakeActionModal(false)}
      />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#F8F9FA' },
  container: { padding: 24, paddingBottom: 50 },
  
  // Grid/Layout
  row: { flexDirection: 'row' },
  col: { flexDirection: 'column' },
  gridRow: { gap: 20, marginBottom: 24 },
  halfWidth: { width: '48%', marginBottom: 16 },
  fullWidth: { width: '100%', marginBottom: 16 },

  // Typography
  title: { fontSize: 24, fontWeight: '700', color: '#1A202C', marginRight: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#2D3748' },
  subText: { fontSize: 12, color: '#A0AEC0' },
  bold: { fontWeight: '700', color: '#1A202C' },
  centerText: { textAlign: 'center', color: '#4A5568' },
  
  // Components
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  actionButton: { backgroundColor: '#3182CE', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6 },
  actionBtnText: { color: 'white', fontWeight: '600' },

  filterRow: { flexDirection: 'row', marginBottom: 24, gap: 12, zIndex: 100 },
  dropdown: { backgroundColor: 'white', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#E2E8F0', position: 'relative', zIndex: 101, overflow: 'visible' },
  dropdownText: { fontWeight: '600', color: '#2D3748' },
  dropdownMenu: { position: 'absolute', top: 40, left: 0, backgroundColor: 'white', borderRadius: 6, borderWidth: 1, borderColor: '#E2E8F0', zIndex: 9999, minWidth: 150 },
  dropdownItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  dropdownItemText: { color: '#2D3748', fontSize: 14 },
  dateFilter: { padding: 10 },
  dateText: { color: '#718096' },

  card: { backgroundColor: 'white', borderRadius: 12, padding: 24, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  gaugeCard: { flex: 1, alignItems: 'center', minHeight: 250 },
  chartCard: { flex: 2, minHeight: 250 },

  // Gauge Visuals
  gaugeContainer: { alignItems: 'center', marginTop: 20 },
  gaugeArch: { width: 180, height: 90, borderTopLeftRadius: 90, borderTopRightRadius: 90, borderWidth: 25, borderColor: '#E2E8F0', borderBottomWidth: 0, overflow: 'hidden', position: 'relative' },
  gaugeNeedle: { width: 4, height: 60, backgroundColor: '#2D3748', position: 'absolute', bottom: 0, left: '50%', transformOrigin: 'bottom' },
  scoreContainer: { alignItems: 'center', marginTop: -30 },
  scoreText: { fontSize: 42, fontWeight: 'bold', color: '#2D3748' },
  scoreLabel: { fontSize: 10, fontWeight: 'bold', color: '#A0AEC0', letterSpacing: 1 },
  gaugeIcons: { flexDirection: 'row', justifyContent: 'space-between', width: 200, marginTop: 10 },

  // Mock Chart
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  mockChart: { height: 150, borderLeftWidth: 1, borderBottomWidth: 1, borderColor: '#CBD5E0', position: 'relative' },
  chartLine: { position: 'absolute', width: '100%', top: '50%', height: 2, backgroundColor: '#E2E8F0' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4299E1', position: 'absolute', marginLeft: -4, marginTop: -4 },

  // KPIs
  kpiRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: 'white', padding: 24, borderRadius: 12, marginBottom: 32 },
  kpiItem: { alignItems: 'center', padding: 10, width: 140 },
  donutPlaceholder: { width: 60, height: 60, borderRadius: 30, borderWidth: 6, borderColor: '#ECC94B', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  kpiLabel: { fontSize: 12, color: '#718096', textAlign: 'center' },
  blueCircleIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#4299E1', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  linkText: { color: '#3182CE', fontSize: 12, fontWeight: '500' },

  // Metrics
  sectionHeader: { fontSize: 18, fontWeight: '700', color: '#2D3748', marginBottom: 16 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  progressContainer: { marginBottom: 10 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  metricLabel: { fontWeight: '600', color: '#2D3748' },
  track: { height: 8, backgroundColor: '#EDF2F7', borderRadius: 4, position: 'relative' },
  fill: { height: '100%', borderRadius: 4 },
  marker: { position: 'absolute', top: -4, width: 0, height: 0, borderLeftWidth: 5, borderRightWidth: 5, borderTopWidth: 8, borderStyle: 'solid', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: '#4A5568' },
  scale: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  scaleText: { fontSize: 10, color: '#A0AEC0' },
});