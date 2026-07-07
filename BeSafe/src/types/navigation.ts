import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Welcome: undefined;
  Onboarding: undefined;
  Login: undefined;
  RegisterStep1: undefined;
  RegisterStep2: { nombre: string; edad: string; ciudad: string };
  RegisterStep3: { nombre: string; edad: string; ciudad: string; email: string; telefono: string };
  Home: undefined;
  Social: undefined;
  Courses: undefined;
  CourseDetail: {  courseTitle: string };
  LiveClasses: undefined;
  Calendar: undefined;
   RequestAdvisory: undefined;
  AdvisoryConfirmation: undefined;
  Profile: undefined;
  Plans: undefined;
  PaymentConfirmation: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;