import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Armilla';

  serviceURL: string;

  tokenCurl: string;

  agentCurl: string;

  groupCurl: string;

  policyCurl: string;

  sinkCurl: string;

  datasetCurl: string;

  constructor(private router: Router) {
    this.serviceURL = 'http://localhost:4200';

    this.tokenCurl = `curl '${this.serviceURL}/tokens' -X POST -H 'Accept: application/json, text/plain, */*' --compressed -H
   'Content-Type: application/json' -H -H --data-raw '{"email":"EMAIL","password":"PASSWORD"}'`;

    this.agentCurl = `curl '${this.serviceURL}/agents' -X POST -H 'Accept: application/json, text/plain, */*' --compressed -H 'Authorization: TOKEN' -H 'Content-Type: application/json' --data-raw '{"name":"AGENT_NAME","orb_tags":{"TAG":"KEY"},"validate_only":false}'`;

    this.groupCurl = `curl 'http://localhost:4200/agent_groups' -X POST -H 'Accept: application/json, text/plain, */*' --compressed -H 'Authorization: TOKEN' -H 'Content-Type: application/json' --data-raw '{"name":"AGENT_GROUP_NAME","description":"AGENT_GROUP_DESCRIPTION","tags":{"TAG":"KEY"},"validate_only":false}'`;

    this.policyCurl = `curl 'http://localhost:4200/policies/agent' -X POST -H 'Accept: application/json, text/plain, */*' --compressed -H 'Authorization: TOKEN' -H 'Content-Type: application/json' --data-raw '{"name":"POLICY_NAME","description":"POLICY_DESCRIPTION","backend":"pktvisor","format":"yaml","policy_data":"handlers:\\n  modules:\\n    default_dns:\\n      type: dns\\n    default_net:\\n      type: net\\ninput:\\n  input_type: pcap\\n  tap: default_pcap\\nkind: collection","version":1}'`;

    this.sinkCurl = `curl 'http://localhost:4200/sinks' -X POST -H 'Accept: application/json, text/plain, */*' --compressed -H 'Authorization: TOKEN' -H 'Content-Type: application/json' --data-raw '{"name":"SINK_NAME","backend":"prometheus","description":"SINK_DESCRIPTION","config":{"remote_host":"REMOTE.WRITE.URL","username":"USERNAME","password":"PASSWORD"},"tags":{"TAG":"KEY"}}'`;

    this.datasetCurl = `curl 'http://localhost:4200/policies/dataset' -X POST -H 'Accept: application/json, text/plain, */*' -H 'Authorization: TOKEN' -H 'Content-Type: application/json' --data-raw '{"name":"DATASET_NAME","agent_group_id":"AGENT_GROUP_ID","agent_policy_id":"AGENT_POLICY_ID","sink_ids":["SINK_ID"]}'`;
  }

  ngOnInit() {
    this.router.events.subscribe()
  }
}
