import { db } from './src/firebase';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';

const STORY_ARCS = [
  {
    order: 1,
    title: { en: 'Ayodhya Kand', te: 'అయోధ్య కాండ', hi: 'अयोध्या कांड' },
    description: { en: 'The early life of Rama in Ayodhya.', te: 'అయోధ్యలో రామ జీవితం.', hi: 'अयोध्या में राम का जीवन।' },
    thumbnail: 'https://picsum.photos/seed/ayodhya/400/300',
    isPublished: true,
  },
  {
    order: 2,
    title: { en: 'Aranya Kand', te: 'అరణ్య కాండ', hi: 'अरण्य कांड' },
    description: { en: 'The exile of Rama in the forest.', te: 'అడవిలో రామ వనవాసం.', hi: 'वन में राम का वनवास।' },
    thumbnail: 'https://picsum.photos/seed/forest/400/300',
    isPublished: true,
  }
];

const LESSONS = [
  {
    arcOrder: 1,
    order: 1,
    isPremium: false,
    videoUrl: 'https://example.com/videos/birth-of-rama.mp4',
    translations: {
      en: { title: 'Birth of Rama', summary: 'The birth of Prince Rama to King Dasharatha.', moral: 'Patience and Prayer' },
      te: { title: 'రాముడి జననం', summary: 'దశరథ మహారాజుకు శ్రీరాముడు జన్మించడం.', moral: 'ఓర్పు మరియు ప్రార్థన' }
    },
    quizSet: {
      questions: [
        { type: 'mcq', question: 'Who was Rama\'s father?', options: ['Dasharatha', 'Janaka', 'Bali'], answer: 0 }
      ]
    }
  }
];

export async function seedDatabase() {
  try {
    console.log('Starting seed...');
    for (const arc of STORY_ARCS) {
      const arcRef = doc(collection(db, 'story_arcs'));
      await setDoc(arcRef, arc);
      
      const arcLessons = LESSONS.filter(l => l.arcOrder === arc.order);
      for (const lesson of arcLessons) {
        await addDoc(collection(db, 'lessons'), {
          ...lesson,
          arcId: arcRef.id
        });
      }
    }
    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Seed failed:', error);
  }
}
