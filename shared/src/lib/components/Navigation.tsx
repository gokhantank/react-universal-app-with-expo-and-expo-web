import React from 'react';
import { Platform, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'react-router-dom';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NavigationProps {
  /**
   * Optional callback for mobile navigation.
   * On web, uses React Router. On mobile, pass useRouter() hook.
   */
  onNavigate?: (path: string) => void;
}

export function Navigation({ onNavigate }: NavigationProps = {}) {
  const isWeb = Platform.OS === 'web';

  if (isWeb) {
    return (
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">h</span>
            </div>
            <span className="text-xl font-bold text-gray-900">heelix</span>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-8">
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/factor-analysis"
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
            >
              Factor analysis
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  // Mobile Navigation
  const insets = useSafeAreaInsets();
  const handleNavigate = onNavigate || (() => {});

  return (
    <View style={[styles.navHeader, { paddingTop: insets.top }]}>
      <View style={styles.logo}>
        <View style={styles.logoIcon}>
          <Text style={styles.logoText}>h</Text>
        </View>
        <Text style={styles.logoName}>heelix</Text>
      </View>
      <View style={styles.navLinks}>
        <TouchableOpacity onPress={() => handleNavigate('/')}>
          <Text style={styles.navLink}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('/factor-analysis')}>
          <Text style={styles.navLink}>Factor analysis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navHeader: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#3B82F6',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  logoName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 24,
  },
  navLink: {
    fontWeight: '600',
    color: '#4B5563',
    fontSize: 14,
  },
});
