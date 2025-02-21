import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

interface CoupleRequest {
  id: string;
  senderName: string;
  senderImage: string;
  requestDate: string;
}

export default function CoupleRequestsList() {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<CoupleRequest[]>([
    // 임시 데이터
    {
      id: '1',
      senderName: '김철수',
      senderImage: 'https://via.placeholder.com/100',
      requestDate: '2024-03-20',
    },
    {
      id: '2',
      senderName: '이영희',
      senderImage: 'https://via.placeholder.com/100',
      requestDate: '2024-03-19',
    },
  ]);

  const handleAcceptRequest = async (requestId: string) => {
    setIsLoading(true);
    try {
      // TODO: API 호출로 커플 신청 수락 처리
      // await acceptCoupleRequest(requestId);
      
      // 임시로 목록에서 제거
      setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('커플 신청 수락 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    setIsLoading(true);
    try {
      // TODO: API 호출로 커플 신청 거절 처리
      // await rejectCoupleRequest(requestId);
      
      // 임시로 목록에서 제거
      setRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('커플 신청 거절 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: CoupleRequest }) => (
    <View style={styles.requestItem}>
      <Image source={{ uri: item.senderImage }} style={styles.profileImage} />
      <View style={styles.requestInfo}>
        <Text style={styles.senderName}>{item.senderName}</Text>
        <Text style={styles.requestDate}>{item.requestDate}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton]}
          onPress={() => handleAcceptRequest(item.id)}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>수락</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={() => handleRejectRequest(item.id)}
          disabled={isLoading}
        >
          <Text style={[styles.buttonText, styles.rejectButtonText]}>거절</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {requests.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>새로운 커플 신청이 없습니다.</Text>
        </View>
      ) : (
        <FlatList
          data={requests}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flexGrow: 1,
  },
  requestItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  requestInfo: {
    flex: 1,
    marginLeft: 12,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
  },
  requestDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#007AFF',
  },
  rejectButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  rejectButtonText: {
    color: '#FF3B30',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
}); 