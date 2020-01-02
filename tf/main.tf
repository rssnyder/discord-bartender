data "google_project" "discord-bartender" {
  project_id = "discord-bartender-263921"
}

resource "google_app_engine_application" "discord-bartender-gae" {
  project     = data.google_project.discord-bartender.project_id
  location_id = "us-central"
}

