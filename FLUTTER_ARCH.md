# Ramayan Kids - Flutter Mobile App Architecture

This directory contains the recommended architecture for the Ramayan Kids mobile application built with Flutter.

## Folder Structure

```text
lib/
├── core/
│   ├── constants/
│   ├── theme/
│   ├── utils/
│   └── widgets/
├── features/
│   ├── auth/
│   │   ├── data/
│   │   ├── domain/
│   │   └── presentation/
│   ├── story_map/
│   │   ├── presentation/
│   │   └── widgets/
│   ├── lesson_player/
│   │   ├── presentation/
│   │   └── widgets/
│   ├── quiz/
│   │   ├── presentation/
│   │   └── widgets/
│   └── parent_dashboard/
│       ├── presentation/
│       └── widgets/
├── services/
│   ├── firebase_service.dart
│   ├── auth_service.dart
│   └── localization_service.dart
└── main.dart
```

## Recommended Stack

- **State Management**: Riverpod (for scalable, testable state)
- **Navigation**: GoRouter (for deep linking and declarative routing)
- **Database**: Cloud Firestore (via `cloud_firestore` package)
- **Auth**: Firebase Auth (via `firebase_auth` package)
- **Video Player**: `video_player` or `chewie`
- **Animations**: `lottie` and `flutter_animate`

## Core Implementation Snippets

### 1. Localization Service
```dart
class LocalizationService {
  static String translate(Map<String, dynamic> translations, String langCode) {
    return translations[langCode] ?? translations['en'] ?? '';
  }
}
```

### 2. Story Map Node Widget
```dart
class StoryNode extends StatelessWidget {
  final Lesson lesson;
  final bool isLocked;
  
  const StoryNode({required this.lesson, this.isLocked = false});

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 300),
      decoration: BoxDecoration(
        color: isLocked ? Colors.grey : Colors.orange,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Icon(isLocked ? Icons.lock : Icons.play_arrow),
    );
  }
}
```

### 3. Quiz Engine Logic
```dart
class QuizNotifier extends StateNotifier<QuizState> {
  QuizNotifier() : super(QuizInitial());

  void submitAnswer(int selectedIndex, int correctIndex) {
    if (selectedIndex == correctIndex) {
      state = QuizCorrect();
    } else {
      state = QuizIncorrect();
    }
  }
}
```
