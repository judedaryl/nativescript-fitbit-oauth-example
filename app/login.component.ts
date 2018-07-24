import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, NgZone } from '@angular/core';
import { WebView, LoadEventData } from "ui/web-view";
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';

const redirectUri = "https://dar-app.azurewebsites.net";
@Component({
    selector: 'ns-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit, AfterViewInit {
    @ViewChild("loginWebView") loginWebView: ElementRef;
    public src: string = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22CXXY&redirect_uri=https%3A%2F%2Fdar-app.azurewebsites.net&scope=profile&expires_in=604800`;
    public code: string = "";
    public access_token = "";
    public refresh_token = "";
    public expires_in = 0;
    public isItemVisible = true;
    public userInfoVisible = false;
    public user: USER = {
        displayName: "",
        dateOfBirth: "",
        averageDailySteps: 0
    }
    constructor(private ngZone: NgZone, private http: HttpClient) { }

    ngOnInit() { }

    ngAfterViewInit() {
        let webView : WebView = this.loginWebView.nativeElement;
        webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
            if(typeof args.url !== "undefined") {
                if(args.url.indexOf(redirectUri) !== -1) {
                    this.isItemVisible = false;
                    const strArr = args.url.substr(redirectUri.length + 1).split("=")
                    const temp = strArr[1];
                    console.dir({
                        ORIGINAL_CODE: temp
                    });
                    this.ngZone.run(() => {
                        this.code = temp.substr(0, temp.length - 2);
                        console.dir("MY CODE");
                        console.dir(this.code);
                        this.requestToken(this.code);
                    });
                }
            }
        });
    }

    requestToken(code: string) {
        console.dir("FETCHING TOKEN");
        const body = new HttpParams();
        body.set("redirect_uri", redirectUri);
        body.set("grant_type", "authorization_code");
        body.set("code", code);
        body.set("clientid", "22CXXY");

        const data = {
            grant_type: "authorization_code",
            redirect_uri: redirectUri,
            code: code,
            clientId: "22CXXY"
        };

        console.dir(data);

        const httpOptions = {
            headers: new HttpHeaders({
                "Authorization" : "Basic MjJDWFhZOjBiOTFhMDZkNTkxM2EyZWM0ZDNkOTY0ZGNiNTg4ZjEw",
                "Content-Type" : "application/x-www-form-urlencoded"
            }),
            params: data
        }
        this.http.post("https://api.fitbit.com/oauth2/token", data, httpOptions)
        .subscribe((data: {access_token: string, refresh_token: string, expires_in: number}) => {
            this.access_token = data.access_token;
            this.refresh_token = data.refresh_token;
            this.expires_in = data.expires_in;
            this.requestUserProfile(this.access_token);
        }, err => {
            console.dir(err);
        });
    }


    requestUserProfile(access_token: string) {
        console.dir(access_token);
        const options = {
             headers: new HttpHeaders({
                "Authorization" : `Bearer ${access_token}`,
            })
        }
    
        this.http.get("https://api.fitbit.com/1/user/-/profile.json", options).subscribe((res: any) => {
            this.user = res.user;
            this.userInfoVisible = true;
        });
    }
}

export interface USER {
    displayName: string;
    dateOfBirth: string;
    averageDailySteps: number;
}