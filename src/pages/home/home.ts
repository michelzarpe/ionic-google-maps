import {Component, ElementRef, ViewChild} from '@angular/core';
import {Platform} from "ionic-angular";
import {GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent, Environment, Geocoder,GeocoderResult, ILatLng, Marker} from "@ionic-native/google-maps";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map')
  private mapElement:ElementRef;
  private map:GoogleMap;
  private location:LatLng;

  constructor(private platform:Platform,private googleMaps:GoogleMaps) {
    this.location = new LatLng(42.346903, -71.135101);
  }

  ionViewDidLoad() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'KEY-GOOGLE',
      'API_KEY_FOR_BROWSER_DEBUG': 'KEY-GOOGLE'
    });



    this.platform.ready().then(() => {
      let element = this.mapElement.nativeElement;
      this.map = this.googleMaps.create(element);

      this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((params:any[]) => {
 
        let latLng: ILatLng = params[0];
        let marker: Marker = this.map.addMarkerSync({'position': latLng});
        console.log(latLng.lat);
        console.log(latLng.lng);
        marker.showInfoWindow();

        
        })
      });    
  }

  addMarker() {
    this.map.addMarker({
      title: 'My Marker',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: this.location.lat,
        lng: this.location.lng
      }
    }).then(marker => {marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {alert('Marker Clicked');});
    });
  }




}