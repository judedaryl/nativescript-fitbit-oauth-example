"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var web_view_1 = require("ui/web-view");
var http_1 = require("@angular/common/http");
var redirectUri = "https://dar-app.azurewebsites.net";
var LoginComponent = /** @class */ (function () {
    function LoginComponent(ngZone, http) {
        this.ngZone = ngZone;
        this.http = http;
        this.src = "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22CXXY&redirect_uri=https%3A%2F%2Fdar-app.azurewebsites.net&scope=profile&expires_in=604800";
        this.code = "";
        this.access_token = "";
        this.refresh_token = "";
        this.expires_in = 0;
        this.isItemVisible = true;
        this.userInfoVisible = false;
        this.user = {
            displayName: "",
            dateOfBirth: "",
            averageDailySteps: 0
        };
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var webView = this.loginWebView.nativeElement;
        webView.on(web_view_1.WebView.loadFinishedEvent, function (args) {
            if (typeof args.url !== "undefined") {
                if (args.url.indexOf(redirectUri) !== -1) {
                    _this.isItemVisible = false;
                    var strArr = args.url.substr(redirectUri.length + 1).split("=");
                    var temp_1 = strArr[1];
                    console.dir({
                        ORIGINAL_CODE: temp_1
                    });
                    _this.ngZone.run(function () {
                        _this.code = temp_1.substr(0, temp_1.length - 2);
                        console.dir("MY CODE");
                        console.dir(_this.code);
                        _this.requestToken(_this.code);
                    });
                }
            }
        });
    };
    LoginComponent.prototype.requestToken = function (code) {
        var _this = this;
        console.dir("FETCHING TOKEN");
        var body = new http_1.HttpParams();
        body.set("redirect_uri", redirectUri);
        body.set("grant_type", "authorization_code");
        body.set("code", code);
        body.set("clientid", "22CXXY");
        var data = {
            grant_type: "authorization_code",
            redirect_uri: redirectUri,
            code: code,
            clientId: "22CXXY"
        };
        console.dir(data);
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                "Authorization": "Basic MjJDWFhZOjBiOTFhMDZkNTkxM2EyZWM0ZDNkOTY0ZGNiNTg4ZjEw",
                "Content-Type": "application/x-www-form-urlencoded"
            }),
            params: data
        };
        this.http.post("https://api.fitbit.com/oauth2/token", data, httpOptions)
            .subscribe(function (data) {
            _this.access_token = data.access_token;
            _this.refresh_token = data.refresh_token;
            _this.expires_in = data.expires_in;
            _this.requestUserProfile(_this.access_token);
        }, function (err) {
            console.dir(err);
        });
    };
    LoginComponent.prototype.requestUserProfile = function (access_token) {
        var _this = this;
        console.dir(access_token);
        var options = {
            headers: new http_1.HttpHeaders({
                "Authorization": "Bearer " + access_token,
            })
        };
        this.http.get("https://api.fitbit.com/1/user/-/profile.json", options).subscribe(function (res) {
            _this.user = res.user;
            _this.userInfoVisible = true;
        });
    };
    __decorate([
        core_1.ViewChild("loginWebView"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "loginWebView", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'ns-login',
            templateUrl: 'login.component.html'
        }),
        __metadata("design:paramtypes", [core_1.NgZone, http_1.HttpClient])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdHO0FBQ2hHLHdDQUFxRDtBQUNyRCw2Q0FBd0Y7QUFFeEYsSUFBTSxXQUFXLEdBQUcsbUNBQW1DLENBQUM7QUFNeEQ7SUFjSSx3QkFBb0IsTUFBYyxFQUFVLElBQWdCO1FBQXhDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFZO1FBWnJELFFBQUcsR0FBVyxrS0FBa0ssQ0FBQztRQUNqTCxTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QixTQUFJLEdBQVM7WUFDaEIsV0FBVyxFQUFFLEVBQUU7WUFDZixXQUFXLEVBQUUsRUFBRTtZQUNmLGlCQUFpQixFQUFFLENBQUM7U0FDdkIsQ0FBQTtJQUMrRCxDQUFDO0lBRWpFLGlDQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQsd0NBQWUsR0FBZjtRQUFBLGlCQW9CQztRQW5CRyxJQUFJLE9BQU8sR0FBYSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUN4RCxPQUFPLENBQUMsRUFBRSxDQUFDLGtCQUFPLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxJQUFtQjtZQUN0RCxFQUFFLENBQUEsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDakMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QyxLQUFJLENBQUMs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SSxDQUFDLEdBQUcsQ0FBQyw4Q0FBOEMsRUFBRSxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxHQUFRO1lBQ3RGLEtBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNyQixLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF2RjBCO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLGlCQUFVO3dEQUFDO0lBRDNDLGNBQWM7UUFMMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSxzQkFBc0I7U0FDdEMsQ0FBQzt5Q0FnQjhCLGFBQU0sRUFBZ0IsaUJBQVU7T0FkbkQsY0FBYyxDQXlGMUI7SUFBRCxxQkFBQztDQUFBLEFBekZELElBeUZDO0FBekZZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXZWJWaWV3LCBMb2FkRXZlbnREYXRhIH0gZnJvbSBcInVpL3dlYi12aWV3XCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlcXVlc3QsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmNvbnN0IHJlZGlyZWN0VXJpID0gXCJodHRwczovL2Rhci1hcHAuYXp1cmV3ZWJzaXRlcy5uZXRcIjtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbnMtbG9naW4nLFxuICAgIHRlbXBsYXRlVXJsOiAnbG9naW4uY29tcG9uZW50Lmh0bWwnXG59KVxuXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICAgIEBWaWV3Q2hpbGQoXCJsb2dpbldlYlZpZXdcIikgbG9naW5XZWJWaWV3OiBFbGVtZW50UmVmO1xuICAgIHB1YmxpYyBzcmM6IHN0cmluZyA9IGBodHRwczovL3d3dy5maXRiaXQuY29tL29hdXRoMi9hdXRob3JpemU/cmVzcG9uc2VfdHlwZT1jb2RlJmNsaWVudF9pZD0yMkNYWFkmcmVkaXJlY3RfdXJpPWh0dHBzJTNBJTJGJTJGZGFyLWFwcC5henVyZXdlYnNpdGVzLm5ldCZzY29wZT1wcm9maWxlJmV4cGlyZXNfaW49NjA0ODAwYDtcbiAgICBwdWJsaWMgY29kZTogc3RyaW5nID0gXCJcIjtcbiAgICBwdWJsaWMgYWNjZXNzX3Rva2VuID0gXCJcIjtcbiAgICBwdWJsaWMgcmVmcmVzaF90b2tlbiA9IFwiXCI7XG4gICAgcHVibGljIGV4cGlyZXNfaW4gPSAwO1xuICAgIHB1YmxpYyBpc0l0ZW1WaXNpYmxlID0gdHJ1ZTtcbiAgICBwdWJsaWMgdXNlckluZm9WaXNpYmxlID0gZmFsc2U7XG4gICAgcHVibGljIHVzZXI6IFVTRVIgPSB7XG4gICAgICAgIGRpc3BsYXlOYW1lOiBcIlwiLFxuICAgICAgICBkYXRlT2ZCaXJ0aDogXCJcIixcbiAgICAgICAgYXZlcmFnZURhaWx5U3RlcHM6IDBcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSwgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cblxuICAgIG5nT25Jbml0KCkgeyB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGxldCB3ZWJWaWV3IDogV2ViVmlldyA9IHRoaXMubG9naW5XZWJWaWV3Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHdlYlZpZXcub24oV2ViVmlldy5sb2FkRmluaXNoZWRFdmVudCwgKGFyZ3M6IExvYWRFdmVudERhdGEpID0+IHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBhcmdzLnVybCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIGlmKGFyZ3MudXJsLmluZGV4T2YocmVkaXJlY3RVcmkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzSXRlbVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RyQXJyID0gYXJncy51cmwuc3Vic3RyKHJlZGlyZWN0VXJpLmxlbmd0aCArIDEpLnNwbGl0KFwiPVwiKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wID0gc3RyQXJyWzFdO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBPUklHSU5BTF9DT0RFOiB0ZW1wXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2RlID0gdGVtcC5zdWJzdHIoMCwgdGVtcC5sZW5ndGggLSAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKFwiTVkgQ09ERVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHRoaXMuY29kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RUb2tlbih0aGlzLmNvZGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlcXVlc3RUb2tlbihjb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5kaXIoXCJGRVRDSElORyBUT0tFTlwiKTtcbiAgICAgICAgY29uc3QgYm9keSA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIGJvZHkuc2V0KFwicmVkaXJlY3RfdXJpXCIsIHJlZGlyZWN0VXJpKTtcbiAgICAgICAgYm9keS5zZXQoXCJncmFudF90eXBlXCIsIFwiYXV0aG9yaXphdGlvbl9jb2RlXCIpO1xuICAgICAgICBib2R5LnNldChcImNvZGVcIiwgY29kZSk7XG4gICAgICAgIGJvZHkuc2V0KFwiY2xpZW50aWRcIiwgXCIyMkNYWFlcIik7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgICAgIGdyYW50X3R5cGU6IFwiYXV0aG9yaXphdGlvbl9jb2RlXCIsXG4gICAgICAgICAgICByZWRpcmVjdF91cmk6IHJlZGlyZWN0VXJpLFxuICAgICAgICAgICAgY29kZTogY29kZSxcbiAgICAgICAgICAgIGNsaWVudElkOiBcIjIyQ1hYWVwiXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc29sZS5kaXIoZGF0YSk7XG5cbiAgICAgICAgY29uc3QgaHR0cE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgICAgIFwiQXV0aG9yaXphdGlvblwiIDogXCJCYXNpYyBNakpEV0ZoWk9qQmlPVEZoTURaa05Ua3hNMkV5WldNMFpETmtPVFkwWkdOaU5UZzRaakV3XCIsXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIiA6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCJcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgcGFyYW1zOiBkYXRhXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5odHRwLnBvc3QoXCJodHRwczovL2FwaS5maXRiaXQuY29tL29hdXRoMi90b2tlblwiLCBkYXRhLCBodHRwT3B0aW9ucylcbiAgICAgICAgLnN1YnNjcmliZSgoZGF0YToge2FjY2Vzc190b2tlbjogc3RyaW5nLCByZWZyZXNoX3Rva2VuOiBzdHJpbmcsIGV4cGlyZXNfaW46IG51bWJlcn0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWNjZXNzX3Rva2VuID0gZGF0YS5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hfdG9rZW4gPSBkYXRhLnJlZnJlc2hfdG9rZW47XG4gICAgICAgICAgICB0aGlzLmV4cGlyZXNfaW4gPSBkYXRhLmV4cGlyZXNfaW47XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RVc2VyUHJvZmlsZSh0aGlzLmFjY2Vzc190b2tlbik7XG4gICAgICAgIH0sIGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmRpcihlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIHJlcXVlc3RVc2VyUHJvZmlsZShhY2Nlc3NfdG9rZW46IHN0cmluZykge1xuICAgICAgICBjb25zb2xlLmRpcihhY2Nlc3NfdG9rZW4pO1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAgICAgXCJBdXRob3JpemF0aW9uXCIgOiBgQmVhcmVyICR7YWNjZXNzX3Rva2VufWAsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIHRoaXMuaHR0cC5nZXQoXCJodHRwczovL2FwaS5maXRiaXQuY29tLzEvdXNlci8tL3Byb2ZpbGUuanNvblwiLCBvcHRpb25zKS5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVzZXIgPSByZXMudXNlcjtcbiAgICAgICAgICAgIHRoaXMudXNlckluZm9WaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVTRVIge1xuICAgIGRpc3BsYXlOYW1lOiBzdHJpbmc7XG4gICAgZGF0ZU9mQmlydGg6IHN0cmluZztcbiAgICBhdmVyYWdlRGFpbHlTdGVwczogbnVtYmVyO1xufSJdfQ==