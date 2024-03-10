import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts'; 
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';

interface PieChartDataItem {
  name: string;
  value: number;
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  pieChartData: PieChartDataItem[] = []; 

  applications: any[] = []; // Array to store all applications
  filteredApplications: any[] = []; // Array to store filtered applications

  selectedStatus: string = 'all'; // Variable to track selected status

  constructor() {}

  ngOnInit(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyAbyhffqzSW62aoW3bQwMBpKFnOoz8-_yo",
      authDomain: "dashboard-a50aa.firebaseapp.com",
      projectId: "dashboard-a50aa",
      storageBucket: "dashboard-a50aa.appspot.com",
      messagingSenderId: "663320387371",
      appId: "1:663320387371:web:fcb57b48624dce4486ef6e",
      measurementId: "G-7LSNVQG41L"
    };
    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);

    // Fetches all documents from the 'database' collection
    getDocs(collection(db, 'database'))
      .then(querySnapshot => {
        this.applications = querySnapshot.docs.map(doc => doc.data());
        this.updatePieChartData(); // Updates pie chart data based on application status
        this.filteredApplications = this.applications.slice(); // Initially shows all applications
      })
      .catch(error => {
        console.error("Error fetching documents: ", error);
      });
  }

  updatePieChartData() {
    const statusCounts = this.applications.reduce((acc, app) => {
      acc[app.Status] = (acc[app.Status] || 0) + 1;
      return acc;
    }, {});

    // Constructs pie chart data
    this.pieChartData = [
      {
        name: 'Identified',
        value: statusCounts['Identified'] || 0
      },
      {
        name: 'In progress',
        value: statusCounts['In progress'] || 0
      },
      {
        name: 'Onboarded',
        value: statusCounts['Onboarded'] || 0
      }
    ];
  }

  onChartClick(event: any) {
    const clickedData = event.name; 
    console.log('Clicked data:', clickedData);
    this.selectedStatus = clickedData; // Sets selectedStatus based on clickedData
    this.filterApplications(); // Filters applications based on selected status
  }

  showAllApplications() {
    this.selectedStatus = 'all'; // Sets selectedStatus to 'all' to show all applications
    this.filterApplications(); // Filters applications based on selected status
  }

  filterApplications() {
    console.log('Selected status:', this.selectedStatus);
    console.log('All applications:', this.applications);
  
    if (this.selectedStatus === 'all') {
      this.filteredApplications = this.applications.slice(); // Shows all applications
    } else {
      this.filteredApplications = this.applications.filter(app => app.Status === this.selectedStatus); // Filters based on selected status
    }
  
    console.log('Filtered applications:', this.filteredApplications);
  }
}
