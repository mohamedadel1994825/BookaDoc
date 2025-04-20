export interface Doctor {
    id: string;
    name: string;
    specialty: string;
    photo: string;
    availability: string[];
    location: string;
    rating: number;
    price: number;
}

export interface Appointment {
    id: string;
    doctorId: string;
    dateTime: string;
    doctorName: string;
    doctorSpecialty: string;
    location: string;
}

export const specialties = [
    'Cardiology',
    'Dermatology',
    'Gastroenterology',
    'Neurology',
    'Pediatrics',
    'Psychiatry',
    'Orthopedics',
    'Oncology',
];

export const doctors: Doctor[] = [
    {
        id: '1',
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        photo: 'https://randomuser.me/api/portraits/women/68.jpg',
        availability: ['Monday 9:00 AM', 'Monday 11:00 AM', 'Wednesday 2:00 PM', 'Friday 10:00 AM'],
        location: 'Medical Center, Building A, Room 302',
        rating: 4.8,
        price: 175.0,
    },
    {
        id: '2',
        name: 'Dr. Michael Chen',
        specialty: 'Dermatology',
        photo: 'https://randomuser.me/api/portraits/men/32.jpg',
        availability: ['Tuesday 10:00 AM', 'Thursday 1:00 PM', 'Thursday 3:00 PM', 'Friday 9:00 AM'],
        location: 'Dermatology Clinic, Suite 205',
        rating: 4.6,
        price: 150.0,
    },
    {
        id: '3',
        name: 'Dr. Robert Williams',
        specialty: 'Gastroenterology',
        photo: 'https://randomuser.me/api/portraits/men/46.jpg',
        availability: ['Monday 2:00 PM', 'Tuesday 11:00 AM', 'Wednesday 9:00 AM', 'Thursday 10:00 AM'],
        location: 'Medical Plaza, Floor 3, Room 312',
        rating: 4.9,
        price: 165.0,
    },
    {
        id: '4',
        name: 'Dr. Emily Davis',
        specialty: 'Neurology',
        photo: 'https://randomuser.me/api/portraits/women/33.jpg',
        availability: ['Monday 10:00 AM', 'Wednesday 1:00 PM', 'Thursday 11:00 AM', 'Friday 2:00 PM'],
        location: 'Neuroscience Center, Wing B, Room 415',
        rating: 4.7,
        price: 185.0,
    },
    {
        id: '5',
        name: 'Dr. James Wilson',
        specialty: 'Pediatrics',
        photo: 'https://randomuser.me/api/portraits/men/64.jpg',
        availability: ['Tuesday 9:00 AM', 'Tuesday 1:00 PM', 'Thursday 9:00 AM', 'Friday 11:00 AM'],
        location: `Children's Health Center, Room 112`,
        rating: 4.9,
        price: 140.0,
    },
    {
        id: '6',
        name: 'Dr. Jessica Brown',
        specialty: 'Psychiatry',
        photo: 'https://randomuser.me/api/portraits/women/17.jpg',
        availability: ['Monday 1:00 PM', 'Wednesday 10:00 AM', 'Wednesday 3:00 PM', 'Friday 1:00 PM'],
        location: 'Mental Health Clinic, Suite 305',
        rating: 4.5,
        price: 200.0,
    },
    {
        id: '7',
        name: 'Dr. David Lee',
        specialty: 'Orthopedics',
        photo: 'https://randomuser.me/api/portraits/men/39.jpg',
        availability: ['Tuesday 2:00 PM', 'Wednesday 11:00 AM', 'Thursday 2:00 PM', 'Friday 9:00 AM'],
        location: 'Orthopedic Specialists, Floor 2, Room 210',
        rating: 4.6,
        price: 160.0,
    },
    {
        id: '8',
        name: 'Dr. Amanda Martinez',
        specialty: 'Oncology',
        photo: 'https://randomuser.me/api/portraits/women/50.jpg',
        availability: ['Monday 3:00 PM', 'Tuesday 9:00 AM', 'Thursday 1:00 PM', 'Friday 3:00 PM'],
        location: 'Cancer Treatment Center, Suite 405',
        rating: 4.8,
        price: 190.0,
    },
]; 