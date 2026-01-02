# Copyright (c) 2026 Frank Perez from The Blueview Group Corporation. All rights reserved.
# https://www.blueview.ai

import typer
from ..engine import migrator, rollback as rollback_engine

app = typer.Typer(help="Project Migrate CLI")


@app.command()
def dry_run(
    source: str = typer.Argument(..., help="Source directory"),
    destination: str = typer.Argument(..., help="Destination directory"),
    parallel: int = typer.Option(4, "--parallel", "-p", help="Parallelism"),
):
    result = migrator.run_migration(
        source=source,
        destination=destination,
        dry_run=True,
        parallelism=parallel,
    )
    typer.echo(result)


@app.command()
def run(
    source: str = typer.Argument(...),
    destination: str = typer.Argument(...),
    parallel: int = typer.Option(4, "--parallel", "-p"),
    no_dry_run: bool = typer.Option(False, help="Skip dry-run and run directly"),
):
    if not no_dry_run:
        typer.echo("Running dry-run first...")
        dry = migrator.run_migration(
            source=source,
            destination=destination,
            dry_run=True,
            parallelism=parallel,
        )
        typer.echo(dry)

    typer.echo("Running migration...")
    result = migrator.run_migration(
        source=source,
        destination=destination,
        dry_run=False,
        parallelism=parallel,
    )
    typer.echo(result)


@app.command()
def rollback(
    target: str = typer.Argument(..., help="Destination/target directory"),
    manifest: str = typer.Argument(..., help="Manifest file path"),
):
    result = rollback_engine.run_rollback(target=target, manifest_path=manifest)
    typer.echo(result)


@app.command()
def version():
    from .. import __version__

    typer.echo(__version__)


if __name__ == "__main__":
    app()
