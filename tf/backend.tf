terraform {
  backend "gcs" {
    credentials = "account.json"
    bucket      = "tf-state-263921"
    prefix      = "terraform/state"
  }
}
